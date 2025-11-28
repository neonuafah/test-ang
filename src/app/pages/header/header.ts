import { Component, output } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, MatIconModule],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    menuClick = output<void>();
    closeMenu = output<void>();
    constructor(private router: Router) { }

    onMenuClick() {
        this.menuClick.emit();
    }

    onLogoClick() {
        this.closeMenu.emit();
        this.router.navigate(['/dashboard']);
    }
}
