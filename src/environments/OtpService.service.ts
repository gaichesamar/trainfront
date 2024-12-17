import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  export class OtpService {
    private storedOtp: string;
  
    setOtp(otp: string): void {
      this.storedOtp = otp;
    }
  
    getOtp(): string {
      return this.storedOtp;
    }
  }
