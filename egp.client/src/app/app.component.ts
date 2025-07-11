import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'egp.client';
  isSidebarCollapsed = false;
  showSidebar = false; // Add this property

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  // Add this method to handle header sidebar toggle
  onHeaderSidebarToggle() {
    this.showSidebar = !this.showSidebar;
  }
}
