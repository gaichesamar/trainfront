import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from "src/app/user";


@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:8083/user";
  private api = "http://localhost:8083";


  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  getTokenWithOtp(username: string, otp: string, refreshToken: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('otp', otp)
      .set('refreshToken', refreshToken);

    return this.http.post<any>(`${this.api}/tokenOtp`, null, { params });
  }
  create(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }
  getAllUsers(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl+'/users')
  }
  update( user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/update`, user);
  }
  

delete(userId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/user/${userId}`);
}
getUser(useremail: string): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/user/${useremail}`);
}

  login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(`${this.api}/tokens`, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    });
  }
}
