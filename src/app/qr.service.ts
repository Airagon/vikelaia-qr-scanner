import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QR_Service {
  private baseUrl: string = 'http://139.91.186.68:3000';

  constructor(private http: HttpClient) {}

  getQR(qr: string): Observable<{ QR: QR_Code }> {
    return this.http.get<{ QR: QR_Code }>(`${this.baseUrl}/QRcodes/${qr}`);
  }
}

interface QR_Code {
  code: string;
  dateGen: string;
  isUsed: boolean;
  dateUsed: string;
}
