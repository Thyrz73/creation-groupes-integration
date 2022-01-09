import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db = getFirestore();

  constructor(public fireservices: AngularFirestore) { }

  // Write in db
  async newConfig(users: number, groups: number, last: string){
    await setDoc(doc(this.db, 'Configuration', 'configID'), {
      Groups: groups,
      Last: last,
      Users: users
    });
  }

  // Read from db
  async getConfig(){
    const docRef = doc(this.db, "Configuration", "configID");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  }
  
}
