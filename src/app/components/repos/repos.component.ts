import { Component, OnInit } from '@angular/core';
import { Repos } from '../../interfaces/Repos';
import { UsersServiceService } from '../../services/users-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repos',
  imports: [CommonModule],
  templateUrl: './repos.component.html',
  styleUrl: './repos.component.css'
})
export class ReposComponent implements OnInit {

  repos: Repos[] = [];

  constructor(private reposService: UsersServiceService){}

  ngOnInit(): void {
    this.reposService.repos$.subscribe((repos: Repos[]) => {
      this.repos = repos;
    });
  }


}
