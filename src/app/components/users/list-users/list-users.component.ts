import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  random='';
  groupName: string = '';
  currentUser = '';
  userInGroup: Boolean = true;
  maxGroup: Boolean = true;

  constructor(public databaseService: DatabaseService, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.showUserWithoutGroup();
    this.disableRandom();
    this.currentUser = this.sharedService.getCurrentUsername();
    this.disableCreate();
  }

  disableCreate(){
    if (this.sharedService.getCreateClicked()){
      document.getElementById("btn-create")!.style.pointerEvents = "none";
      document.getElementById("btn-create")!.style.backgroundColor = "gray";
    }
  }

  async showUserWithoutGroup(){
    await this.databaseService.getUsersWithoutGroup().then((res) => {
      let  listContainer = document.createElement('div'),
        listElement = document.createElement('div'), listItem;
        listContainer.setAttribute("id","list-container");
        listContainer.setAttribute("style", 
                      "display:flex;width:300px;position:absolute;top:10%;left:45%;padding: 50px;background-color: rgb(190, 235, 243);border-radius: 10px;box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.09);")
        listElement.setAttribute("style", "margin-left:35%");

        document.getElementsByTagName('body')[0].appendChild(listContainer);
        listContainer.appendChild(listElement);

        res.forEach(element => {
            listItem = document.createElement('p');
            listItem.setAttribute("style", 
              "padding:10px;margin-bottom:15px;height:30px;text-align:center;font-size:24px;background-color: rgba(120, 216, 206, 0.5);width:auto;border-radius: 30px;box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.09);");
            listItem.innerHTML = element.toString();
            listElement.appendChild(listItem);
        });
              
    })
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
