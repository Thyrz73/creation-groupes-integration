import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-config-grpes',
  templateUrl: './config-grpes.component.html',
  styleUrls: ['./config-grpes.component.css']
})
export class ConfigGrpesComponent implements OnInit {

  nbUsers!: number;
  nbGrps!: number;
  lastGrp!: string;

  constructor(public databaseService: DatabaseService) { }

  ngOnInit(): void {
  }

  createConfig(){
    let usersPerGroup = Math.abs(this.nbUsers/this.nbGrps);
    this.databaseService.newConfig(this.nbUsers, this.nbGrps, this.lastGrp, usersPerGroup);
  }

  readData(){
    this.databaseService.getConfig();
  }

}
