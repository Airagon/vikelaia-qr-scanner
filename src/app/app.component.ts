import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'vikelaia-qr-scanner';
  qrResultString: string;
  shownButton = Buttons.SCAN;

  scannerEnabled = false;
  plainText!: string;
  encryptText = 'lalala';
  encPassword!: string;
  decPassword = 'aasda';
  conversionEncryptOutput!: string;
  conversionDecryptOutput!: string;

  scannerHasResult = false;

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
      $event.trim(),
      this.decPassword.trim()
    ).toString(CryptoJS.enc.Utf8);

    if (this.conversionDecryptOutput === this.encryptText) {
      this.scannerHasResult = true;
      this.shownButton = Buttons.CONTINUE;
    }
  }

  continueScanning() {
    this.scannerHasResult = false;
    this.disableScanner();
  }
}

enum Buttons {
  SCAN,
  STOP,
  CONTINUE,
}
