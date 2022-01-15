import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(public databaseServices: DatabaseService) { }   

  ngOnInit(): void {
    this.getCreated();
  }

  async getCreated(){
    let data = await this.databaseServices.createdGrp();
    if (data == 0){
      document.getElementById("no-group")!.style.display = "inline";
    }
    else{
      // TODO : display groups
    }
  }

}
