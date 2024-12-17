import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8083/reclamation';

  constructor(private http: HttpClient) {}

  getAllreclamation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  
  createreclamation(reclamation: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl, reclamation, httpOptions);
  }
  deleteTrajet(reclamationId: number): Observable<any> {
    const url = `${this.apiUrl}/${reclamationId}`;
    return this.http.delete<any>(url);
  }
}