import { Component } from '@angular/core';
import { SearchComponent } from "../../components/search/search.component";
import { UserListComponent } from "../../components/user-list/user-list.component";

@Component({
  selector: 'app-home',
  imports: [SearchComponent, UserListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
