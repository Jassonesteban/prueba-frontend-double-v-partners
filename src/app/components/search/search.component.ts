import { Component } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchQuery: string = '';
  users: any[] = [];
  errorMessage: string = '';

  constructor(private userService: UsersServiceService, private errorService: ErrorService) {}

  searchUsers() {
    this.errorService.clearError();
    if (this.searchQuery.length < 4) {
      this.errorService.setError('La búsqueda debe contener al menos 4 caracteres.');
      return;
    }

    if (this.searchQuery.toLowerCase() === 'doublevpartners') {
      this.errorService.setError('No se puede buscar la palabra "doublevpartners". Intente otro termino');
      return;
    }

    if (!this.searchQuery.trim()) {
      this.errorService.setError('El campo de búsqueda no puede estar vacío.');
      return;
    }

    this.userService.updatePage(1);
    this.userService.getUserSearch(this.searchQuery, 1).subscribe({
      next: (response) => {
        this.userService.updateUsers(response.items);
        this.userService.updateTotal(response.total_count);
        this.userService.updateQuery(this.searchQuery);
      },
      error: (error) => {
        this.errorService.setError('Error al buscar usuarios.');
      }
    });
  }

}
