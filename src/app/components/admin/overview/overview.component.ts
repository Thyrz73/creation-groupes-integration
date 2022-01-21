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
      this.databaseServices.getCreatedGroups();
      await this.databaseServices.getCreatedGroups().then((res) => {
        res.forEach((data) => {
          for (let i=0; i<data.length; i++){
            console.log("Group",i+1, data[i]);
          }
        })
      })
    }
  }

}
