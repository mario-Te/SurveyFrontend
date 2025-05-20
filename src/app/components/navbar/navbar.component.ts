import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [animate('500ms ease-in')])
    ])
  ]
})
export class NavbarComponent {
  isLoggedIn = false
  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"])
  }
}
