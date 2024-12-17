import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/environments/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.userService.login(username, password).subscribe(
        (response: any) => {
          const otp = response.OTP;
          this.displayOtpAndRefreshToken(response.OTP, response.refreshToken, response.username);
          sessionStorage.setItem('refreshToken', response.refreshToken);
          sessionStorage.setItem('username', username);
          console.log('Complete Login Response:', response);
          this.router.navigate(['/auth/lock']);
        },
        (error) => {
          console.error('Authentication failed:', error);
          this.errorMessage = 'Incorrect OTP. Please check your code.';
        }
      );
    }
  }

  displayOtpAndRefreshToken(otp: string, refreshToken: string, username: string): void {
    // Your implementation here
  }
}
