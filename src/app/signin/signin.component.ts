import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from './../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  signIn: FormGroup;
  uniqueId: String;
  errorMsg: String;

  ngOnInit() {
    this.signIn = this.fb.group({
      signInEmail : new FormControl('', [Validators.email, Validators.minLength(5)])
    });
  }

  onSubmit(e){ 
    console.log(this.signIn.value);
    this.userService.signIn(this.signIn.value.signInEmail)
      .subscribe(
        response=>{
          console.log(response);
          if(response['user']){
            this.router.navigateByUrl('/profile/' + response['user']['email']);
          } else{
            this.errorMsg = 'No user found with the given email'
          }
        }
      )
    
  }
}
