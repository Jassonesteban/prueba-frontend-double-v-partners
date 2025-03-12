import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/User';
import { catchError, of } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  totalUsers: number = 0;
  users: User[] = [];  // Usuarios por defecto
  searchResults: User[] = [];  // Resultados de la búsqueda (si existen)
  pageSize: number = 10;
  currentPage: number = 1;
  paginatedUsers: User[] = []; // Usuarios que se mostrarán en la página actual
  allUsers: User[] = [];
  querySearch: string = '';

  constructor(
    private userService: UsersServiceService,
    private cdRef: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.userService.query$.subscribe((filter) => {
      this.querySearch = filter;
      this.searchResults = [];  // Limpia los resultados previos
      this.allUsers = [];       // Evita mezclar con usuarios por defecto
      this.fetchUsers(1);       // Carga nueva búsqueda desde la página 1
    });

    this.userService.totalUsers$.subscribe((total) => {
      this.totalUsers = total > 1000 ? 1000 : total;
    });

    this.userService.query$.subscribe((filter) => {
      this.querySearch = filter;
      this.fetchUsers(1);
    });

    this.userService.page$.subscribe((page) => {
      this.currentPage = page;
      this.paginateUsers();
      this.fetchUsersIfRequired();
    });

    if (this.searchResults.length === 0) {
      this.fetchDefaultUsers();
    }
  }

  fetchDefaultUsers() {
    this.userService.getUsersDefault().subscribe((response) => {
      this.allUsers = response.items;
      this.totalUsers = response.total_count > 1000 ? 1000 : response.total_count;
      this.paginateUsers();
    });
  }

  fetchUsers(page: number) {
    if (this.querySearch.trim()) {
      this.userService.getUserSearch(this.querySearch, page).subscribe({
        next: (response) => {
          console.log(`Página ${page} - Resultados:`, response.items);

          if (response.items.length > 0) {
            if (page === 1) {
              // Si es la primera página, reemplaza los resultados
              this.searchResults = response.items;
            } else {
              // Si no, agrega los nuevos evitando duplicados
              this.searchResults = [...new Map([...this.searchResults, ...response.items]
                .map(user => [user.id, user])).values()];
            }

            this.totalUsers = response.total_count > 1000 ? 1000 : response.total_count;
            this.paginateUsers();
          }
        },
        error: () => {
          console.error('Error al obtener los usuarios');
        }
      });
    }
  }

  fetchUsersIfRequired() {
    if (this.currentPage % 3 === 0 && this.currentPage !== 1) {
      this.fetchUsers(Math.floor(this.currentPage / 3) + 1);
    }
  }

  paginateUsers() {
    const usersToPaginate = this.searchResults.length > 0 ? this.searchResults : this.allUsers;

    //console.log(`📄 Página actual: ${this.currentPage}`);
    //console.log('🔹 Usuarios disponibles:', usersToPaginate.length);

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, usersToPaginate.length); // Limita al tamaño real
    console.log(startIndex);
    console.log(usersToPaginate.length)
    if (startIndex <= usersToPaginate.length) {
      this.paginatedUsers = usersToPaginate.slice(startIndex, endIndex);
    } else {
      console.warn('⚠️ Página fuera de rango, no hay usuarios para mostrar');
      this.paginatedUsers = [];
    }

    console.log('📌 Usuarios a mostrar:', this.paginatedUsers);
  }

  nextPage() {
    const totalPages = Math.ceil(this.totalUsers / this.pageSize);
    if (this.currentPage < totalPages) {
      this.userService.updatePage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.userService.updatePage(this.currentPage - 1);
    }
  }

  openRepo(url: string) {
    window.open(url, '_blank');
  }

  get paginatedUsersList() {
    return this.paginatedUsers;
  }

  get totalPages() {
    return Math.ceil(this.totalUsers / this.pageSize);
  }
}
