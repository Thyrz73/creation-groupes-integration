import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {

  constructor(public dataService: DatabaseService) { }

  ngOnInit(): void {
    this.nbGroups();
    this.nbUsers();
  }

  nbGroups(){
    this.dataService.createdGrp().then((res) => {
      document.getElementById("users")!.innerHTML = "Groupes : "+res;
    })
  }

  nbUsers(){
    this.dataService.getNbUsers().then((res) => {
      document.getElementById("groups")!.innerHTML = "Utilisateurs : "+res;
    })
  }


}
