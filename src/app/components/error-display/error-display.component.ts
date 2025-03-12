import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-display',
  imports: [CommonModule],
  templateUrl: './error-display.component.html',
  styleUrl: './error-display.component.css',
})
export class ErrorDisplayComponent implements OnInit {
  errorMessage: string = '';
  private errorSubscription: Subscription | undefined;

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorSubscription = this.errorService.errorMessage$.subscribe(
      (message) => {
        this.errorMessage = message;
        if (this.errorMessage) {
          setTimeout(() => {
            this.cerrarError();
          }, 6000);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }

  cerrarError(): void {
    this.errorMessage = '';
    this.errorService.clearError();
  }
}
