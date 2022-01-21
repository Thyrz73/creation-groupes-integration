import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  random='';

  constructor(public databaseService: DatabaseService) { }

  ngOnInit(): void {
    // this.showUserWithoutGroup();
  }

  async showUserWithoutGroup(){
    await this.databaseService.getUsersWithoutGroup().then((res) => {
      let  listContainer = document.createElement('div'),
        listElement = document.createElement('ul'), listItem,i;
        listContainer.setAttribute("style","margin-left:50%");
        document.getElementsByTagName('body')[0].appendChild(listContainer);
        listContainer.appendChild(listElement);

        res.forEach(element => {
            listItem = document.createElement('li');
            listItem.innerHTML = element.toString();
            listElement.appendChild(listItem);
        });
              
    })
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