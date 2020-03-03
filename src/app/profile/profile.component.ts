import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {UserService} from './../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private userService : UserService) { }

  email: String;
  userPosition: Number;
  userReferrals: [String];

  ngOnInit() {
    this.route.params
      .subscribe(
        params=>{
          this.email = params.email;
          console.log(this.email);
          if(!this.email){
            this.router.navigateByUrl('/signin');
          } else{
            this.userService.profile(this.email)
              .subscribe(
                response =>{
                  console.log(response);
                  if(response['user']){
                    this.userPosition = response['user']['waitingListId']['position'];
                    this.userReferrals = response['user']['referredUsers'];
                  } else{
                    this.router.navigateByUrl('/signin');
                  }
                }
              )
          }
        }
      )
  }

}
