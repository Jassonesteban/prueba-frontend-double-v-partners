import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserResponse } from '../interfaces/UserResponse';
import { catchError, tap } from 'rxjs/operators';
import { UserDetails } from '../interfaces/UserDetails';
import { Repos } from '../interfaces/Repos';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  private url_base_estandar = "https://api.github.com/search/users?q=";
  private url_get_User = "https://api.github.com/users";
  private parametro_defecto = "YOUR_NAME";

  private usersSource = new BehaviorSubject<any[]>([]);
  users$ = this.usersSource.asObservable();

  private totalUsersSource = new BehaviorSubject<number>(0);
  totalUsers$ = this.totalUsersSource.asObservable();

  private querySource = new BehaviorSubject<string>('');  // Inicialmente vacío
  query$ = this.querySource.asObservable();

  private pageSource = new BehaviorSubject<number>(1);  // Agregar BehaviorSubject para la página
  page$ = this.pageSource.asObservable();  // Observable para el número de página

  private reposSubject = new BehaviorSubject<Repos[]>([]);
  repos$ = this.reposSubject.asObservable();

  constructor(private http: HttpClient, private errorservice: ErrorService) { }

  updateUsers(users: any[]) {
    this.usersSource.next(users);
  }

  updateTotal(TotalUser: any) {
    this.totalUsersSource.next(TotalUser);
  }

  updatePage(page: number) {
    this.pageSource.next(page);
  }

  updateQuery(query:string){
    this.querySource.next(query);
  }

  setRepos(repos: Repos[]): void {
    this.reposSubject.next(repos);
  }

  getUsersDefault(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.url_base_estandar}${this.parametro_defecto}`).pipe(
      tap(response => this.usersSource.next(response.items))
    );
  }

  getStoredUsers(): any[] {
    return this.usersSource.value;
  }

  getUserSearch(LoginUser: string, page: number = 1): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.url_base_estandar}${LoginUser}&page=${page}`).pipe(
      tap(response => {
        this.usersSource.next(response.items);
        this.totalUsersSource.next(response.total_count);
      }),
      catchError(error => {
        this.errorservice.handleError(error);
        return of({
          items: [],
          total_count: 0,
          incomplete_results: false
        } as UserResponse);
      })
    );
  }


  getInfoUserByLogin(login: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${this.url_get_User}/${login}`);
  }

  getRepos(login: string): Observable<Repos[]> {
    return this.http.get<Repos[]>(`${this.url_get_User}/${login}/repos`);
  }
}
