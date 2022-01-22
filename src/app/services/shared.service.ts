import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  currentUsername: string = '';
  randomClicked: Boolean = false;
  quitClicked: Boolean = false;
  createClicked: Boolean = false;

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
  }
  getQuitClicked(){
    return this.randomClicked;
  }

  setCreateClicked(){
    this.createClicked = true;
    this.randomClicked = true;
  }
  getCreateClicked(){
    return this.randomClicked;
  }
}