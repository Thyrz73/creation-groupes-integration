import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentUsername: string = '';
  randomClicked: Boolean = false;
  quitClicked: Boolean = false;
  createClicked: Boolean = false;
  triggerRandom: Boolean = false;

  constructor() { }

  setCurrentUsername(username: string){
    this.currentUsername = username;
  }
  getCurrentUsername(){
    return this.currentUsername;
  }

  setRandomClicked(){
    this.randomClicked = true;
  }
  getRandomClicked(){
    return this.randomClicked;
  }

  setQuitCliked(){
    this.quitClicked = true;
    this.randomClicked = false;
    this.createClicked = false;
  }
  getQuitClicked(){
    return this.randomClicked;
  }

  setCreateClicked(){
    this.createClicked = true;
  }
  getCreateClicked(){
    return this.createClicked;
  }

  setTriggerRandom(){
    this.triggerRandom = true;
  }
  unsetTriggerRandom(){
    this.triggerRandom = false;
  }
  getTriggerRandom(){
    return this.triggerRandom;
  }
}