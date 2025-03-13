import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserScoreGuard } from './guards/user-score.guard';

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "user-detail/:userId", component: UserPageComponent, canActivate:[UserScoreGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
