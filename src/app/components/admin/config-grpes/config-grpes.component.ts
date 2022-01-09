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
    this.databaseService.newConfig(this.nbUsers, this.nbGrps, this.lastGrp);
  }

  readData(){
    this.databaseService.getConfig();
  }

}
