import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'vikelaia-qr-scanner';
  qrResultString: string;
  shownButton = Buttons.SCAN;

  private baseUrl: string = 'http://139.91.186.68:3000';

  constructor(private http: HttpClient) {}

  getQR(qr: string): Observable<{ QR: QR_Code }> {
    return this.http.get<{ QR: QR_Code }>(`${this.baseUrl}/QRcodes/${qr}`);
  }

  scannerEnabled = false;

  encryptText = 'lalala';
  decPassword = 'aasda';
  conversionDecryptOutput!: string;

  scannerHasResult = false;

  correctResult = false;

  ngOnInit() {
    // action.toggleCamera()
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  enableScanner() {
    this.scannerEnabled = true;
    this.shownButton = Buttons.STOP;
  }

  disableScanner() {
    this.scannerEnabled = false;
    this.shownButton = Buttons.SCAN;
  }

  async scanSuccessHandler($event) {
    this.conversionDecryptOutput = CryptoJS.AES.decrypt(
      $event.trim().replace('*', '/'),
      this.decPassword.trim()
    ).toString(CryptoJS.enc.Utf8);

    this.scannerHasResult = true;

    if (this.conversionDecryptOutput === this.encryptText) {
      await this.getQR(this.conversionDecryptOutput).subscribe(
        async (res: any) => {
          alert('SSSS' + res);
          if (res.isValid) this.correctResult = true;
          else {
            this.correctResult = false;
          }
        }
      );
    }

    this.shownButton = Buttons.CONFIRM;
  }

  reScan() {
    this.scannerHasResult = false;
    this.shownButton = Buttons.STOP;
  }
}

enum Buttons {
  SCAN,
  STOP,
  CONFIRM,
}

interface QR_Code {
  code: string;
  dateGen: string;
  isUsed: boolean;
  dateUsed: string;
}
