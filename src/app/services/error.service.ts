import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private errorMessageSource = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessageSource.asObservable();

  constructor() {}

  setError(message: string): void {
    this.errorMessageSource.next(message);
  }

  clearError(): void {
    this.errorMessageSource.next('');
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error inesperado';

    if (error.status === 403) {
      errorMessage = 'Error 403: Acceso prohibido o límite de peticiones alcanzado.';
    } else if (error.status === 404) {
      errorMessage = 'Error 404: Recurso no encontrado.';
    } else if (error.status === 500) {
      errorMessage = 'Error 500: Problema en el servidor.';
    }

    this.setError(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
