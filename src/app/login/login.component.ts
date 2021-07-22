import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  message: string

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.message = '';
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      res => { 
        console.log(res);
        this.authService.setUser(username);
        this.router.navigateByUrl('customers');
      },
      error => { 
        console.log(error);
        //return false; 
      }
    );
  }

}
