import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/user";
import { UserService } from "src/environments/user.service";

@Component({
  selector: "app-card-settings",
  templateUrl: "./card-settings.component.html",
})
export class CardSettingsComponent implements OnInit {
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
  updateUser() {
    this.userService.update(this.userData).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}
