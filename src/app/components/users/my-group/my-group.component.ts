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
  
  constructor(public databaseService: DatabaseService, 
    public sharedService: SharedService) { }

  ngOnInit(): void {
    this.currentUser = this.sharedService.getCurrentUsername();
    this.groupInfos(this.currentUser);
    this.disableRandom();
    document.getElementById("list-container")?.remove();
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
    alert("Vous avez bien quitté votre groupe.");
  }

  async randomGroup(){
    this.sharedService.setRandomClicked();
    this.disableRandom();
    await this.databaseService.getGroupName(this.currentUser).then((res) => {
      this.groupName = res!;
    });
    console.log("GROUPE CHANGE = ",parseInt(this.groupName));
    parseInt(this.groupName) !== 0 ? 
                          document.getElementById("already-group")!.style.display = "inline"
                          :
                          await this.databaseService.getIncompleteGroups().then((res) => {
                            this.random = res[Math.floor(Math.random()*res.length)].toString();
                            document.getElementById("group-name")!.style.display = "inline";
                            this.databaseService.putInRandomGroup(this.currentUser, this.random);
                            return res;
                          });
  }

  disableRandom(){
    // console.log(this.sharedService.getRandomClicked());
    if (this.sharedService.getRandomClicked()){
      document.getElementById("btn-random")?.setAttribute("style", "pointer-events:none");
      document.getElementById("btn-random")?.setAttribute("style", "background-color:gray");
    }
  }
}
