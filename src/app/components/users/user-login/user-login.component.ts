import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  username!: string;

  constructor(private router: Router, 
            public databaseService : DatabaseService, 
            public sharedService: SharedService) { }

  ngOnInit(): void {
  }

  async loginuser(){
    if(this.username !== null && this.username.length > 0 && !this.username.startsWith(" ")){
      await this.databaseService.logInName(this.username).then((res) => {
        if (res){
          this.router.navigate(['/dashboard-user/~']);
          this.sharedService.setCurrentUsername(this.username);
          return 'login user ok';
        }
        else{
          document.getElementById("error")!.style.display = "inline";
          return 'login error max users';
        }
      })
      return 'login user ok';
    }
    else{
      return 'login error empty';
    }
  }
}