import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService : AuthService,
    private router: Router){}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
        username: this.fb.control(""),
        password: this.fb.control("")
    });
  }

  handleLogin(){
    this.authService.login(this.formLogin.value.username, this.formLogin.value.password).subscribe(
      {
        next: (data) => {
          // console.log(data);
          this.authService.loadProfile(data);
          this.router.navigateByUrl("/admin");
        },
        error: err => {
          console.log(err);
        }
      }
    );
  }
}
