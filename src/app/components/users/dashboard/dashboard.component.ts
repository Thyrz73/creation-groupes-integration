import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  random = '';

  constructor(public databaseService: DatabaseService) { }

  ngOnInit(): void {
  }

  async randomGroup(){
    await this.databaseService.getIncompleteGroups().then().then((res) => {
      this.random = res[Math.floor(Math.random()*res.length)].toString();
      document.getElementById("group-name")!.style.display = "inline";
      this.databaseService.putInRandomGroup('nono', this.random);
      return res;
    });
  }

}
