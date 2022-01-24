import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-grpes',
  templateUrl: './config-grpes.component.html',
  styleUrls: ['./config-grpes.component.css']
})
export class ConfigGrpesComponent implements OnInit {

  nbUsers!: number;
  nbGrps!: number;
  lastGrp!: string;

  constructor(public databaseService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
  }

  createConfig(){
    if(this.nbGrps > this.nbUsers){
      document.getElementById("too-much-users")?.setAttribute("style", "display:block");
      document.querySelector('button')!.disabled = true;
    }
    else{
      let usersPerGroup = Math.ceil(this.nbUsers/this.nbGrps);
      this.databaseService.newConfig(this.nbUsers, this.nbGrps, this.lastGrp, usersPerGroup);
      this.router.navigateByUrl('/overview');
    }
  }

  readData(){
    this.databaseService.getConfig();
  }

}
