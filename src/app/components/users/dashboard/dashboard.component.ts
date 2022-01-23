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
  userInGroup: Boolean = true;
  maxGroup: Boolean = true;


  constructor(public databaseService: DatabaseService, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.currentUser = this.sharedService.getCurrentUsername();
    this.disableRandom();
    this.disableCreate();
    document.getElementById("list-container")?.remove();
    this.databaseService.invitedToGrp(this.currentUser).then((resp)=> {
      if(resp !== '/'){
        document.getElementById("invite-msg")?.setAttribute("style","display:inline-block");
      }
      console.log(resp);
    });
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

  inviteAcc(){
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    this.databaseService.joinInv(this.currentUser).then(async (respo)=>{
      if (respo===0){
        console.log("joined !!!");
        await delay(1300);
        document.getElementById("invite-msg")?.setAttribute("style","display:none");
      }else if (respo===1){
        console.log("no space in grp :( ");
        await delay(1300);
        document.getElementById("invite-msg")?.setAttribute("style","display:none");
      }else if (respo === 2){
        console.log("invitation invalide");
        await delay(1300);
        document.getElementById("invite-msg")?.setAttribute("style","display:none");
      }else{
        console.log("you already in grp ( ._.)");
      }
    })
  }
  
  inviteRef(){
    this.databaseService.resetInv(this.currentUser);
    document.getElementById("invite-msg")?.setAttribute("style","display:none");
  }

  disableRandom(){
    // console.log(this.sharedService.getRandomClicked());
    if (this.sharedService.getRandomClicked()){
      document.getElementById("btn-random")?.setAttribute("style", "pointer-events:none");
      document.getElementById("btn-random")?.setAttribute("style", "background-color:gray");
    }
  }

  disableCreate(){
    if (this.sharedService.getCreateClicked()){
      document.getElementById("btn-create")!.style.pointerEvents = "none";
      document.getElementById("btn-create")!.style.backgroundColor = "gray";
    }
  }

}
