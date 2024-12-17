// lock.component.ts

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/environments/user.service";

@Component({
  selector: "app-lock",
  templateUrl: "./lock.component.html",
})
export class LockComponent implements OnInit {
  username: string = '';
  otp: string = '';
  enteredOtp: string = '';
user: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
   
  }

  
  onSubmitOtp(): void {
    const refreshToken = sessionStorage.getItem('refreshToken');
    const username = sessionStorage.getItem('username');
    this.userService.getTokenWithOtp(username, this.enteredOtp, refreshToken)
    .subscribe(
      (resdata: any) => {
        console.log('Complete Token Response:', resdata);

        if (resdata && resdata.accessToken) {
         
          this.router.navigate(['admin/horraire'], { replaceUrl: true });
        } else {
          console.error('Token not found in the response.');
          
        }
      },
      (tokenError) => {
        console.error('Error obtaining token with OTP:', tokenError);
   
      }
    );
  }
}