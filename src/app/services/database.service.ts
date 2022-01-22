import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { doc, getDoc, getFirestore, setDoc, getDocs, collection, query, where, updateDoc, arrayUnion, increment } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db = getFirestore();

  constructor(public fireservices: AngularFirestore) { }

  // Write admin config settings in db
  async newConfig(users: number, groups: number, last: string, userPerGroup: number){
    await setDoc(doc(this.db, 'Configuration', 'configID'), {
      CurrentGroups: 0,
      Groups: groups,
      Last: last,
      NbCurrentUsers: 0,
      Users: users,
      UsersPerGroup: userPerGroup,
    });
  }

  // Read admin config settings from db
  async getConfig(){
    const docRef = doc(this.db, "Configuration", "configID");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  // Read nb groups created from db
  async createdGrp(){
    const docRef = doc(this.db, "Groups", "groupsCreated");
    const docSnap = await getDoc(docRef);
    let data;

    if (docSnap.exists()){
      try {
        data = docSnap.data().created;
        return data;
      } catch (err) {
        console.error(err);
        return 'err';
      }
    }
    else{
      return -1;
    }
  }

  // Get users without a groups
  async getUsersWithoutGroup(){
    let list: String [] = [];
    const userRef = collection(this.db, "Users");
    const q = query(userRef, where("Group", "==", 0));
    const snapShot = getDocs(q);

    (await snapShot).forEach((doc)=>{
      list.push(doc.data()["Name"]);
    });
    console.log(list);
    return list;
  }

  // Get incomplete groups
  async getIncompleteGroups(){
    let list: number[] = [], id;
    const userRef = collection(this.db, "Groups");
    const q = query(userRef, where("FreePlace", "!=", 0));
    const snapShot = getDocs(q);

    (await snapShot).forEach((doc)=>{
      id = doc.data()["Id"];
      list.push(id);
    });
    return list;
  }

  // Put a user in random group
  async putInRandomGroup(username: string, random: String){
    let group = "Group"+random;
    await updateDoc(doc(this.db, 'Groups', group), {
      Users: arrayUnion(username),
      FreePlace: increment(-1)
    });
    await updateDoc(doc(this.db, "Users", username), {
      Group: random
    });
  }

  // Get group name
  async getGroupName(username: String){
    let group;
    const userRef = collection(this.db, "Users");
    const q = query(userRef, where("Name", "==", username));
    const snapShot = getDocs(q);

    (await snapShot).forEach((doc)=>{
      group = doc.data()["Group"];
    });
    return group;
  }

  // Get users of group
  async getUsers(groupId: String){
    let list: String[] = [], user;
    const userRef = collection(this.db, "Groups");
    const q = query(userRef, where("Id", "==", groupId));
    const snapShot = getDocs(q);

    (await snapShot).forEach((doc)=>{
      user = doc.data()["Users"];
      list.push(user);
    });
    return list;
  }

  // Get all created groups
  async getCreatedGroups(){
    let groupNames: String [] = [];
    const userRef = collection(this.db, "Groups");
    const snapShot = getDocs(userRef);

    (await snapShot).forEach((doc)=>{
      groupNames[doc.data()["Id"]] = doc.data()["Users"];
    });
    return groupNames;
  }

  async removeFromGroup(username: string, id: string){
    await updateDoc(doc(this.db, 'Users', username), {
      Group: 0
    });
    await updateDoc(doc(this.db, "Groups", id), {
      FreePlace: increment(1),
    });
  }

  // Register username if login for first time
  async logInName(username: string){
    const userRef = collection(this.db, "Users");
    const q = query(userRef, where("Name", "==", username));
    const snapShot = getDocs(q);
    const refUsersCurrent = await getDoc(doc(this.db, "Configuration", "configID"));
    const usersCurrent = refUsersCurrent.data()!["NbCurrentUsers"];
    const refUsersMax = await getDoc(doc(this.db, "Configuration", "configID"));
    const usersMax = refUsersMax.data()!["Users"];
    
    if(usersCurrent < usersMax){
      if((await snapShot).empty){
        await setDoc(doc(this.db, 'Users', username), {
          Group: 0,
          Name: username
        });
        await updateDoc(doc(this.db, "Configuration", "configID"), {
          NbCurrentUsers: increment(1)
        })
      }
      return true;
    }
    else{
      if((await snapShot).empty){
        return false;
      }
      return true;
    }
  }

  // Delete group
  deleteGrp(id: number){
    const groupRef = collection(this.db, "Groups");
  }
  
}
