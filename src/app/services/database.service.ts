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

  // Get nb groups created
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
  async putInRandomGroup(username: string, random: string){
    let group = "Group"+random;
    await updateDoc(doc(this.db, 'Groups', group), {
      Users: arrayUnion(username),
      FreePlace: increment(-1)
    });
    await updateDoc(doc(this.db, "Users", username), {
      Group: parseInt(random)
    });
  }

  // Get group name of user
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

  // Get list users of group
  async getUsers(groupId: string){
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

    let list: String[] = [], user;
    const userRef = collection(this.db, "Groups");
    const q = query(userRef, where("Id", "==", id));
    const snapShot = getDocs(q);
    
    (await snapShot).forEach((doc)=>{
      user = doc.data()["Users"];
      list.push(user);
    });

    let finalList: String[] = [], j=0;
    for(let i=0; i<list[0].length; i++){
      if(list[0][i]!==username){
        finalList[j] = list[0][i];
        j++;
      }
    }
    await updateDoc(doc(this.db, 'Groups', "Group"+id), {
      FreePlace: increment(1),
      Users: finalList
    });
  }
  
  async GroupCreation(inviteName:string, username: string, code:string){
    
    const refGrpCurrent = await getDoc(doc(this.db, "Configuration", "configID"));
    const grpCurrent = refGrpCurrent.data()!["CurrentGroups"];
    const maxGroups = await getDoc(doc(this.db, "Configuration", "configID"));
    const maxNumber = maxGroups.data()!["Groups"];
    const grp = await getDocs(collection(this.db, "Groups"));
    const freeplace = maxGroups.data()!["UsersPerGroup"] - 1;
    
    let id = 0;
    grp.forEach((data) => {
      id++;      
    });
    id++;

    if(grpCurrent >= maxNumber){
      return false;
    }else{
      let list: String [] = [];
      list.push(username);
      
      await setDoc(doc(this.db, 'GroupsOnHold', 'Group'+id), {
        FreePlace:freeplace,
        Id: id,
        Users :list,
        invite : code,
        Creator: username
      });

      this.inviteUser(inviteName,code);

      return true;
    }
  }

  async inviteUser(inviteName:string, code:string){
    const userRef = collection(this.db, "Users");
    const q = query(userRef, where("Name", "==", inviteName));
    const snapShot = getDocs(q);
 
    if(!(await snapShot).empty){
      await updateDoc(doc(this.db, 'Users', inviteName), {
        invite: code
      });
      return true;
    }
    else{
      return false;
    }
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
          Name: username,
          invite:"~"
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

  async invitedToGrp(user: string){
    const userRef = collection(this.db, "Users");
    const q = query(userRef, where("Name", "==", user));
    const snapShot = getDocs(q);
    
    let res;

    (await snapShot).forEach((doc)=>{
      res = doc.data()["invite"];
    })
    return res;
  }

  async joinInv(user:string){
    
    let users: String [] = [];
    let groupId=0,freeplace=0,inGrp, code="";
    await this.invitedToGrp(user).then((res)=>{
      code = res!;
    })
    const grpRef = collection(this.db, "GroupsOnHold");
    const q = query(grpRef, where("invite", "==", code));
    const snapShot = getDocs(q);

    (await snapShot).forEach((doc)=>{
      groupId=doc.data()["Id"];
      users=doc.data()["Users"];
      freeplace=doc.data()["FreePlace"];
    })

    if((await snapShot).empty){
      return 2;
    }

    if(freeplace==0){
      return 1;
    }

    const userRef = collection(this.db, "Users");
    const q2 = query(userRef, where("Name", "==", user));
    const snapShot2 = getDocs(q2);
    (await snapShot2).forEach((doc2)=>{
      inGrp=doc2.data()["Group"];
    })

    if(inGrp !== 0){
      return 3;
    }

    let listUsers: string[] = [], creator ='';
    const refGrpCurrent = await getDoc(doc(this.db, "Configuration", "configID"));
    const grpCurrent = refGrpCurrent.data()!["CurrentGroups"] + 1;

    await updateDoc(doc(this.db, "Configuration", "configID"),{
      CurrentGroups: increment(1)
    });
    (await snapShot).forEach((doc) => {
      listUsers = doc.data()["Users"];
      creator = doc.data()["Creator"];
    });

    await setDoc(doc(this.db, "Groups", "Group"+grpCurrent),{
      FreePlace: freeplace,
      Id: grpCurrent,
      Users: listUsers,
      invite: code
    });
    await updateDoc(doc(this.db, "Users", creator),{
      Group: grpCurrent
    })
    await updateDoc(doc(this.db, "GroupsOnHold", "Group"+groupId),{
      FreePlace: increment(-1)
    });
    this.changeGrp(grpCurrent, user, listUsers);
    return 0;
  }

  async changeGrp(groupId:number, user:string, users:String[]){
    await updateDoc(doc(this.db, 'Users', user), {
      Group: groupId
    });
    users.push(user);
    await updateDoc(doc(this.db, 'Groups', 'Group'+groupId), {
      FreePlace: increment(-1),
      Users:users
    });
    await updateDoc(doc(this.db, 'Users', user), {
      invite: '~'
    });
  }

  async resetInv(user:string){
    await updateDoc(doc(this.db, 'Users', user), {
      invite: '~'
    });
  }

  // Check if we got to max nb of groups
  async groupIsMax(){
    const refGrpCurrent = await getDoc(doc(this.db, "Configuration", "configID"));
    const grpCurrent = refGrpCurrent.data()!["CurrentGroups"];
    const maxNumber = refGrpCurrent.data()!["Groups"];

    if (grpCurrent >= maxNumber){
      return true;
    }
    else{
      return false;
    }
  }

    // Check if configuration empty
    async checkConfig(){
      const confRef = await (getDoc(doc(this.db, "Configuration", "configID")));
      if ((await confRef).data() == undefined){
        return false;
      }
      return true;
    }

    async updateInv(id:string, user:string){
      await updateDoc(doc(this.db, 'Users', user), {
        invite: id
      });
    }
  
}
