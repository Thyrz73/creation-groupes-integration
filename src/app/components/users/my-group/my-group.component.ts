import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-my-group',
  templateUrl: './my-group.component.html',
  styleUrls: ['./my-group.component.css']
})
export class MyGroupComponent implements OnInit {
  groupName: String = '';
  users: String[] = [];

  constructor(public databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.groupInfos('Sakura');
  }

  async groupInfos(username: String){
    await this.databaseService.getGroupName(username).then((res) => {
      this.groupName = res!;
    })
    await this.databaseService.getUsers(this.groupName).then((res) => {
      res.forEach((data) => {
        for (let i=0; i<data.length; i++){
          this.users.push(data[i]);
        }
      })
    });
    // console.log(this.users);
  }

  quitGroup(username = 'Sasuke'){
    
  }

}
