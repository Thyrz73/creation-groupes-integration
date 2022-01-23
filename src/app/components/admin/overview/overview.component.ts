import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  list: String [] = [];
  nbGroup: number = 0;

  constructor(public databaseServices: DatabaseService) { }   

  ngOnInit(): void {
    this.getCreated();
  }

  async getCreated(){
    let data = await this.databaseServices.createdGrp();
    if (data == 0 || data == -1){
      document.getElementById("no-group")!.style.display = "inline";
    }
    else{
      this.databaseServices.getCreatedGroups();
      await this.databaseServices.getCreatedGroups().then((res) => {
        let j=0;
        res.forEach((data) => {
          this.list[j] = data;
          j++;
        })
      })
      this.nbGroup = this.list.length;
    }
  }

  deleteGroup(id: number){
    this.databaseServices.deleteGrp(id);
  }

}
