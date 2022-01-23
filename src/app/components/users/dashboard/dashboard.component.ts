import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  random = '';
  groupName: string = '';
  noGroup: Boolean = true;
  currentUser: string = '';

  constructor(public databaseService: DatabaseService, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.currentUser = this.sharedService.getCurrentUsername();
    this.disableRandom();
    document.getElementById("list-container")?.remove();
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
