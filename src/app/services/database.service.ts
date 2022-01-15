import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db = getFirestore();

  constructor(public fireservices: AngularFirestore) { }

  // Write admin config settings in db
  async newConfig(users: number, groups: number, last: string){
    await setDoc(doc(this.db, 'Configuration', 'configID'), {
      Groups: groups,
      Last: last,
      Users: users
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
      }
    }
    else{
      return -1;
    }
  }
  
}
