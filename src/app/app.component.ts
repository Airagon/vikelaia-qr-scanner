import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vikelaia-qr-scanner';
  public output!: any;
  public onError(e:any): void {
    alert(e);
  }

  
}
