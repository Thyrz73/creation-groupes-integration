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

  constructor(public databaseService: DatabaseService, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.showUserWithoutGroup();
    this.disableRandom();
    this.currentUser = this.sharedService.getCurrentUsername();
  }

  async showUserWithoutGroup(){
    await this.databaseService.getUsersWithoutGroup().then((res) => {
      let  listContainer = document.createElement('div'),
        listElement = document.createElement('div'), listItem;
        listContainer.setAttribute("id","list-container");
        listContainer.setAttribute("style", 
                      "display:flex;width:300px;position:absolute;top:10%;left:50%;padding: 50px;background-color: rgb(190, 235, 243);border-radius: 10px;box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.09);")
        listElement.setAttribute("style", "margin-left:11%");

        document.getElementsByTagName('body')[0].appendChild(listContainer);
        listContainer.appendChild(listElement);

        res.forEach(element => {
            listItem = document.createElement('p');
            listItem.setAttribute("style", 
              "padding:5px;margin-bottom:15px;height:30px;text-align:center;font-size: 24px;background-color: rgba(120, 216, 206, 0.5);width:auto;border-radius: 20px;box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.09);");
            listItem.innerHTML = element.toString();
            listElement.appendChild(listItem);
        });
              
    })
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
