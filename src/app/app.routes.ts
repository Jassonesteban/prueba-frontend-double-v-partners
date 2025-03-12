import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './components/user/user.component';
import { UserPageComponent } from './pages/user-page/user-page.component';

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "user-detail/:userId", component: UserPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
