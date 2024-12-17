import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/user";
import { UserService } from "src/environments/user.service";

@Component({
  selector: "app-card-profile",
  templateUrl: "./card-profile.component.html",
})
export class CardProfileComponent implements OnInit {
  userId: number;
  userInfo: any;
  user:User;
userData: any;

  constructor(private userService: UserService, private router: Router) {}

  storedUsername: string;
  dateNaissance: string;

  ngOnInit() {
    this.storedUsername = sessionStorage.getItem('username');
    this.dateNaissance = sessionStorage.getItem('dateNaissance');
    
    this.userId = Number(localStorage.getItem('userId'));
  
    if (this.storedUsername) {
      this.userService.getUser(this.storedUsername).subscribe(
        (user) => {
          this.userInfo = user;
          console.log(user);
          this.user = user;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }
  }
  updateUser(user: any) {
   
    this.router.navigate(['/pages/update'], { state: { user } });
  }
}  
