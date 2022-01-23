import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { UserLoginComponent } from '../user-login/user-login.component';
import { SharedService } from 'src/app/services/shared.service';

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

  
  constructor(public databaseService: DatabaseService, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.currentUser = this.sharedService.getCurrentUsername();
    this.groupInfos(this.currentUser);
    this.disableRandom();
    document.getElementById("list-container")?.remove();
    this.disableCreate();
  }

  async checkIfUserInGroup(){
    this.sharedService.setCreateClicked();
    this.disableCreate();
    await this.databaseService.getGroupName(this.currentUser).then((res) => {
      if (parseInt(res!) !== 0){
        this.userInGroup = true;
        this.maxGroup = false;
      }
      else{
        this.userInGroup = false;
      }
    });
  }


  async checkMaxGrp(){
    this.databaseService.groupIsMax().then((res) => {
      if(res){
        this.maxGroup = true;
        this.userInGroup = false;
      }
      else{
        this.maxGroup = false;
      }
    })
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
  }

  async randomGroup(){
    this.sharedService.setRandomClicked();
    this.disableRandom();
    await this.databaseService.getGroupName(this.currentUser).then((res) => {
      this.groupName = res!;
    })
    this.groupName !== '0' ? 
                          document.getElementById("already-group")!.style.display = "inline"
                          :
                          await this.databaseService.getIncompleteGroups().then().then((res) => {
                            this.random = res[Math.floor(Math.random()*res.length)].toString();
                            document.getElementById("group-name")!.style.display = "inline";
                            this.databaseService.putInRandomGroup(this.currentUser, this.random);
                            this.sharedService.setRandomClicked();
                            return res;
                          });
  }

  disableRandom(){
    // console.log(this.sharedService.getRandomClicked());
    if (this.sharedService.getRandomClicked()){
      document.getElementById("btn-random")!.style.pointerEvents = "none";
      document.getElementById("btn-random")!.style.backgroundColor = "gray";
    }
  }
}
