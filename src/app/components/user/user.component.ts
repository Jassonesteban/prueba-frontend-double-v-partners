import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersServiceService } from '../../services/users-service.service';
import { UserDetails } from '../../interfaces/UserDetails';
import { Repos } from '../../interfaces/Repos';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})


export class UserComponent implements OnInit {

  userId: string = '';
  user: UserDetails = {} as UserDetails;
  repos: Repos[] = [];

  constructor(private route: ActivatedRoute, private userService: UsersServiceService, private errorService: ErrorService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId')!;
      this.obtenerInfoUsuario(this.userId);
      this.obtenerRepos(this.userId);
    });
  }

  obtenerInfoUsuario(userId: string): void {
    this.userService.getInfoUserByLogin(userId).subscribe({
      next: (response: UserDetails) => {
        this.user = response;
      },
      error: (err) => {
        this.errorService.setError('No se pudo obtener la información del usuario. Por favor, intenta nuevamente más tarde.');
      }
    });
  }

  obtenerRepos(userId: string): void {
    this.userService.getRepos(userId).subscribe({
      next: (response: Repos[]) => {
        this.repos = response;
        this.userService.setRepos(this.repos);
      },
      error: (err) => {
        this.errorService.setError('No se pudieron cargar los repositorios. Por favor, intenta nuevamente más tarde.');
      }
    });
  }

}
