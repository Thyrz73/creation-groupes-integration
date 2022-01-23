import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { UserLoginComponent } from '../user-login/user-login.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-create-grp',
  templateUrl: './create-grp.component.html',
  styleUrls: ['./create-grp.component.css']
})
export class CreateGrpComponent implements OnInit {
  random = '';
  inputUserName:string = '';
  groupName: string = '';
  users: String[] = [];
  noGroup: Boolean = true;
  currentUser = '';
  code = '~';
  userInGroup: Boolean = true;
  maxGroup: Boolean = true;

  constructor(public databaseService: DatabaseService, public sharedService: SharedService) { }

  ngOnInit(): void {
    this.currentUser = this.sharedService.getCurrentUsername();
    this.disableRandom();
    this.disableCreate();
    this.checkIfUserInGroup();
    this.checkMaxGrp();
    document.getElementById("list-container")?.remove();
    this.code = Math.random().toString(36).substring(2,10);
  }

  async createGroup(){
    //console.log(this.inputUserName);
    (document.getElementById("input-grp-name")as HTMLInputElement).value="";
    
    if(await this.databaseService.GroupCreation(this.inputUserName, this.currentUser, this.code)){
      document.getElementById("created-text")?.setAttribute("style","display:inline-block");
      document.getElementById("btn-create-grp")?.setAttribute("style","margin-top: 50px;");
      alert("Votre groupe ne sera définitivement créé que si un de vos invités aura accepté l'invitation.");
    }else{
      document.getElementById("create-failed-text")?.setAttribute("style","display:inline-block");
      document.getElementById("btn-create-grp")?.setAttribute("style","margin-top: 50px;");
    }

  }

  sendInv(){
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const cond = this.databaseService.inviteUser(this.inputUserName, this.code).then(async (resp)=>{
      if(resp){
        document.getElementById("inv-text")?.setAttribute("style","display:inline-block");
        document.getElementById("btn-create-grp")?.setAttribute("style","margin-top: 50px;");
        await delay(1300);
        document.getElementById("btn-create-grp")?.setAttribute("style","margin-top: 100px;");
        document.getElementById("inv-text")?.setAttribute("style","display:none");
      }else{
        document.getElementById("inv-failed-text")?.setAttribute("style","display:inline-block");
        document.getElementById("btn-create-grp")?.setAttribute("style","margin-top: 50px;");
        await delay(1300);
        document.getElementById("inv-failed-text")?.setAttribute("style","display:none");
        document.getElementById("btn-create-grp")?.setAttribute("style","margin-top: 100px;");

      }
    }); 
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
    parseInt(this.groupName) !== 0 ? 
                          document.getElementById("already-group")!.style.display = "inline"
                          :
                          await this.databaseService.getIncompleteGroups().then((res) => {
                            if (res.length == 0){
                              document.getElementById("unexistant-group")!.style.display = "inline";
                              this.sharedService.setCreateClicked();
                              return 0;
                            }
                            else{
                              this.random = res[Math.floor(Math.random()*res.length)].toString();
                              document.getElementById("group-name")!.style.display = "inline";
                              document.getElementById("already-group")!.style.display = "none";
                              this.databaseService.putInRandomGroup(this.currentUser, this.random);
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

}