import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { Header } from './pages/header/header';
import { Navbar } from './pages/navbar/navbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SocketService } from './services/socket.service';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, Header, Navbar, MatSnackBarModule, ScrollingModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('testangular');
  isNavbarOpen = signal(true);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly isOverlay = toSignal(
    this.breakpointObserver
      .observe('(max-width: 960px)')
      .pipe(map(result => result.matches)),
    { initialValue: false }
  );
  sidenavMode = computed<MatDrawerMode>(() =>
    this.isOverlay() ? 'over' : 'side'
  );

  private readonly socketService = inject(SocketService);
  private readonly snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      if (!this.isOverlay()) {
        this.isNavbarOpen.set(true);
      }
    });

    this.socketService.listen('server_notify_new_booking').subscribe((data) => {
      console.log('New booking received:', data);
      this.snackBar.open('New Booking Received!', 'Close', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });
  }

  toggleNavbar() {
    this.isNavbarOpen.update(value => !value);
  }

  closeNavbar() {
    this.isNavbarOpen.set(false);
  }

  onNavigated() {
    if (this.isOverlay()) {
      this.closeNavbar();
    }
  }
}
