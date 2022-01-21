import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  username!: string;

  constructor(private router: Router, public databaseService : DatabaseService) { }

  ngOnInit(): void {
  }

  loginuser(){
    this.databaseService.logInName(this.username);
    this.router.navigate(['/dashboard-user']);
  }
}