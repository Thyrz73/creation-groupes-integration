import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { UserLoginComponent } from '../user-login/user-login.component';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.css']
})
export class MyGroupComponent implements OnInit {
  random = '';
  groupName: string = '';
  users: String[] = [];
  noGroup: Boolean = true;
  currentUser = '';
  userInGroup: Boolean = true;
  maxGroup: Boolean = true;

  
  constructor(private router: Router,
    public databaseService: DatabaseService, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.currentUser = this.sharedService.getCurrentUsername();
    this.disableRandom();
    this.disableCreate();
    document.getElementById("list-container")?.remove();
    this.groupInfos(this.currentUser);
  }

  disableCreate(){
    if (this.sharedService.getCreateClicked()){
      document.getElementById("btn-create")!.style.pointerEvents = "none";
      document.getElementById("btn-create")!.style.backgroundColor = "gray";
    }
  }


  async groupInfos(username: String){
    await this.databaseService.getGroupName(username).then((res) => {
      this.groupName = res!;
    })
    parseInt(this.groupName) === 0 ? this.noGroup = true : this.noGroup = false;
    if (!this.noGroup){
      await this.databaseService.getUsers(this.groupName).then((res) => {
        res.forEach((data) => {
          for (let i=0; i<data.length; i++){
            this.users.push(data[i]);
          }
        })
      });
    }
  }

  quitGroup(){
    this.databaseService.removeFromGroup(this.currentUser, this.groupName);
    this.sharedService.setQuitCliked();
    alert("Vous avez bien quitté le groupe.");
    this.sharedService.unsetTriggerRandom();
  }

  triggerRandom(){
    this.sharedService.setTriggerRandom();
  }

  disableRandom(){
    // console.log(this.sharedService.getRandomClicked());
    if (this.sharedService.getRandomClicked()){
      document.getElementById("btn-random")!.style.pointerEvents = "none";
      document.getElementById("btn-random")!.style.backgroundColor = "gray";
    }
  }
}
