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
  encryptText!: string;
  encPassword!: string;
  decPassword!: string;
  conversionEncryptOutput!: string;
  conversionDecryptOutput!: string;

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
    alert(this.conversionDecryptOutput);
  }
}

enum Buttons {
  SCAN,
  STOP,
  CONTINUE,
}
