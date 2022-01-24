import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dataService: DatabaseService, public router:Router ) { }

  ngOnInit(): void {
    this.dataService.checkConfig().then((data) => {
      if(!data){
        document.getElementById("btn-user")?.setAttribute("style","pointer-events:none;background-color:gray");
      }
    })
  }

  redirect(){
    this.dataService.checkConfig().then((data) => {
      if(data){
        this.router.navigateByUrl('user-login');
      }
    })
  }

}
