import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersServiceService } from '../services/users-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserScoreGuard implements CanActivate {

  constructor(private router: Router, private userService: UsersServiceService){}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> |boolean {
    const userId = route.paramMap.get('userId');

    if (userId) {
      const users = this.userService.getStoredUsers();
      const user = users.find(u => u.login === userId);

      if (user && user.score >= 1) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }

    this.router.navigate(['/home']);
    return false;
  }
}
