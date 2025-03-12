import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterModule } from '@angular/router';
import { ErrorDisplayComponent } from "./components/error-display/error-display.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterModule, ErrorDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'users_list';
}
