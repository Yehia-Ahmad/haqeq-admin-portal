import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import swal from "sweetalert2";
import { DiskService } from '../../shared/services/disk.service';
import { Login } from "../../../pages/auth/login";

@Component({
  selector: 'hakek-login',
  standalone: true,
  imports: [Login],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router, private diskService: DiskService) {}

  ngOnInit(): void {
    const access_token = this.diskService.accessToken;
    if (access_token) {
      this.router.navigate(['blogs/all-blogs']);
    }
  }

  submitForm(credentials): void {
    this.authService.login(credentials).subscribe({
      next: (res) => {
        this.diskService.accessToken = res.items.access_token;
        this.diskService.user = res.items.item;
        this.router.navigate(['blogs/all-blogs']);
        this.authService.is_User_LoggedIn.next(true);
      },
      error: (err) => {
        swal.fire('Error', err.error.message, 'error');
      }
    });
  }

}
