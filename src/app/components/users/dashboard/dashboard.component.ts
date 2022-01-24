import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router, public databaseService: DatabaseService, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.currentUser = this.sharedService.getCurrentUsername();
    document.getElementById("list-container")?.remove();
    this.databaseService.invitedToGrp(this.currentUser).then((resp)=> {
      if(resp !== '~'){
        document.getElementById("invite-msg")?.setAttribute("style","display:inline-block");
      }
    });
    this.disableRandom();
    this.disableCreate();
    this.checkRandom();
  }

  async checkRandom(){
    if (this.sharedService.getTriggerRandom()){
      this.randomGroup();
    }
  }

  disableCreate(){
    if (this.sharedService.getCreateClicked()){
      document.getElementById("btn-create")!.style.pointerEvents = "none";
      document.getElementById("btn-create")!.style.backgroundColor = "gray";
    }
    else{
      document.getElementById("btn-create")!.setAttribute("style","background-color: rgb(0, 191, 255);");
    }
  }


  inviteAcc(){
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    this.databaseService.joinInv(this.currentUser).then(async (respo)=>{
      if (respo===0){
        alert("Vous avez bien intégrer le groupe.");
        await delay(1300);
        document.getElementById("invite-msg")?.setAttribute("style","display:none");
        this.router.navigateByUrl("/my-group");
      }else if (respo===1){
        alert("Il n'y a plus de place dans le groupe :(.");
        await delay(1300);
        document.getElementById("invite-msg")?.setAttribute("style","display:none");
        this.databaseService.resetInv(this.currentUser);
      }else if (respo === 2){
        alert("Lien d'invitation invalide :(.");
        await delay(1300);
        document.getElementById("invite-msg")?.setAttribute("style","display:none");
        this.databaseService.resetInv(this.currentUser);
      }else{
        alert("Vous êtes déjà dans un groupe. Vous ne pouvez plus accepter l'invitation.");
        this.databaseService.resetInv(this.currentUser);
        this.router.navigateByUrl("/my-group");
      }
    })
  }
  
  inviteRef(){
    this.databaseService.resetInv(this.currentUser);
    document.getElementById("invite-msg")?.setAttribute("style","display:none");
  }
  

  async randomGroup(){
    this.sharedService.setRandomClicked();
    this.disableRandom();
    await this.databaseService.getGroupName(this.currentUser).then((res) => {
      this.groupName = res!;
    })
    parseInt(this.groupName) !== 0 ? 
                          document.getElementById("already-group")!.style.display = "inline"
                          :
                          await this.databaseService.getIncompleteGroups().then((res) => {
                            if (res.length == 0){
                              document.getElementById("unexistant-group")!.style.display = "inline";
                              return 0;
                            }
                            else{
                              this.random = res[Math.floor(Math.random()*res.length)].toString();
                              document.getElementById("group-name")!.style.display = "inline";
                              document.getElementById("already-group")!.style.display = "none";
                              this.databaseService.putInRandomGroup(this.currentUser, this.random);
                              this.sharedService.setCreateClicked();
                              this.disableCreate();
                              return res;
                            }
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
