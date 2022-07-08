import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import QR_Service from 'src/app/qr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'vikelaia-qr-scanner';
  qrResultString: string;
  shownButton = Buttons.SCAN;

  constructor(private QRservice: QR_Service) {}

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

  scanSuccessHandler($event) {
    this.conversionDecryptOutput = CryptoJS.AES.decrypt(
      $event.trim().replace('*', '/'),
      this.decPassword.trim()
    ).toString(CryptoJS.enc.Utf8);

    this.scannerHasResult = true;

    if (this.conversionDecryptOutput === this.encryptText) {
      this.correctResult = true;
    } else this.correctResult = false;

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
