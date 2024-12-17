import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private apiUrl = 'http://localhost:8083/trajets';

  constructor(private http: HttpClient) {}

  getAllTrajets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  createReservation(trajetId: number, reservationData: any): Observable<any> {
    const url = `${this.apiUrl}/${trajetId}/reservations`;
    return this.http.post<any>(url, reservationData);
  }
  createTrajet(trajet: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl, trajet, httpOptions);
  }
}
