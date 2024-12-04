import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-side-bar',
  standalone: false,
  templateUrl: './admin-side-bar.component.html',
  styleUrl: './admin-side-bar.component.css'
})
export class AdminSideBarComponent {
  activeButton: string = 'dashboard'; // Set default active button

  setActiveButton(buttonName: string) {
    this.activeButton = buttonName;
  }
}
