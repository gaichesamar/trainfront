import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
})
export class AdminNavbarComponent implements OnInit {

    userPhoto: string;  // Declare the type of the property
    userEmail: string;

    constructor() {}

    ngOnInit(): void {
        this.userPhoto = sessionStorage.getItem('userPhoto');
        this.userEmail = sessionStorage.getItem('userEmail');
    }
}
