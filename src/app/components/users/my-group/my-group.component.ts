import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { UserLoginComponent } from '../user-login/user-login.component';

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
  constructor(public databaseService: DatabaseService) { }

  ngOnInit(): void {
    // let username = this.userLogin.username;
    this.groupInfos('Eren');
  }

  async groupInfos(username: String){

    await this.databaseService.getGroupName(username).then((res) => {
      this.groupName = res!;
    })
    this.groupName === '0' ? this.noGroup = true : 
    await this.databaseService.getUsers(this.groupName).then((res) => {
      res.forEach((data) => {
        for (let i=0; i<data.length; i++){
          this.users.push(data[i]);
        }
      })
    });
  }

  quitGroup(){
    this.databaseService.removeFromGroup('Sakura', this.groupName);
  }

  async randomGroup(){
    await this.databaseService.getIncompleteGroups().then().then((res) => {
      this.random = res[Math.floor(Math.random()*res.length)].toString();
      document.getElementById("group-name")!.style.display = "inline";
      this.databaseService.putInRandomGroup('nono', this.random);
      return res;
    });
  }
}
