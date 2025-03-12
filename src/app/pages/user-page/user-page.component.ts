import { Component } from '@angular/core';
import { UserComponent } from "../../components/user/user.component";
import { ReposComponent } from "../../components/repos/repos.component";

@Component({
  selector: 'app-user-page',
  imports: [UserComponent, ReposComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {

}
