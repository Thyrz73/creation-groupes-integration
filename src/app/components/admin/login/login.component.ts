import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loginAdmin(): String{
    if(this.username === "admin"){
      this.router.navigate(['/config']);
      return 'login ok';
    }
    else{
      document.getElementById("error")!.style.display = "inline";
      return 'login error';
    }
  }

}
