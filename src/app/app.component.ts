import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'vikelaia-qr-scanner';
  public output!: any;
  public onError(e: any): void {
    alert(e);
  }

  ngOnInit() {}
}
