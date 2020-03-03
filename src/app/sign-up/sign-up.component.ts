import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

import {UserService} from './../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  signUp: FormGroup;
  errorMsg: String;
  uniqueId: String;

  ngOnInit() {
    this.signUp = this.fb.group({
      email : new FormControl('', [Validators.email, Validators.minLength(5)])
    });

    this.route.params
      .subscribe(
        params=>{
          this.uniqueId = params.uniqueId;
          console.log(this.uniqueId);
        }
      )
  }

  onSubmit(e){ 
    console.log(this.signUp.value);
    if(this.uniqueId === undefined){
      this.userService.signUp(this.signUp.value)
        .subscribe(
          response=>{
            console.log(response)
            this.router.navigateByUrl('/profile/' + response['user']['email']);
          },
          error=>{
            console.log(error);
            this.errorMsg = error['error'];
          }
        )
    } else{
      this.userService.referralSignUp(this.signUp.value, this.uniqueId)
        .subscribe(
          response=>{
            console.log(response)
            this.router.navigateByUrl('/profile/' + response['user']['email']);
          },
          error=>{
            console.log(error);
            this.errorMsg = error['error'];
          }
        )
    }
  }

}
