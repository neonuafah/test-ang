import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss',
})
export class Navbar {
    isExpanded = signal(true);
    isSettingExpanded = signal(false);

    toggleMenu() {
        this.isExpanded.update(value => !value);
    }

    toggleSetting() {
        this.isSettingExpanded.update(value => !value);
    }
}
