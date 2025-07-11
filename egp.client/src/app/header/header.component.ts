import { Component, Input, OnInit, HostListener, Output, EventEmitter } from '@angular/core';

interface User {
  name: string;
  avatar: string;
  jobTitle?: string;
  email?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() sidebarCollapsed = false;
  @Output() sidebarToggled = new EventEmitter<void>(); // Add this output

  isDarkMode = false;
  showUserDropdown = false;
  searchTerm = '';
  imageLoadError = false;
  dropdownImageLoadError = false;
  isMobile = false;

  currentUser: User = {
    name: 'Muhammad Ejaz',
    avatar: 'assets/images/employee-avatar.jpg',
    jobTitle: 'Software Engineer',
    email: 'muhammad.ejaz@company.com'
  };

  // High-quality scalable SVG fallback avatars
  alternativeAvatars = [
    'assets/images/employee-avatar.jpg',
    'assets/images/profile-pic.jpg',
    'assets/images/default-avatar.png',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkMSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmOWZhZmI7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZTVlN2ViO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSJ1cmwoI2dyYWQxKSIgc3Ryb2tlPSIjZDFkNWRiIiBzdHJva2Utd2lkdGg9IjEiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjM1IiByPSIxNSIgZmlsbD0iIzljYTNhZiIvPjxwYXRoIGQ9Ik0yNSA3NUMyNSA2NSAzNiA1OCA1MCA1OFM3NSA2NSA3NSA3NVY4NUgyNVY3NVoiIGZpbGw9IiM5Y2EzYWYiLz48L3N2Zz4=',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkMiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzM5OGRmOTtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMyNTYzZWI7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9InVybCgjZ3JhZDIpIi8+PHRleHQgeD0iNTAiIHk9IjU5IiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjgiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NRTwvdGV4dD48L3N2Zz4='
  ];

  notificationCount = 3;

  ngOnInit() {
    this.loadUserData();
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  // Add the missing toggleSidebar method
  toggleSidebar() {
    this.sidebarToggled.emit();
  }

  loadUserData() {
    console.log('User data loaded:', this.currentUser);
  }

  onImageError(event: Event) {
    console.log('Main avatar failed to load, trying alternatives...');
    const currentIndex = this.alternativeAvatars.indexOf(this.currentUser.avatar);
    if (currentIndex < this.alternativeAvatars.length - 1) {
      this.currentUser.avatar = this.alternativeAvatars[currentIndex + 1];
    } else {
      this.imageLoadError = true;
      const target = event.target as HTMLImageElement;
      if (target) {
        target.style.display = 'none';
      }
    }
  }

  onDropdownImageError(event: Event) {
    console.log('Dropdown avatar failed to load...');
    this.dropdownImageLoadError = true;
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  onSearch(value: string) {
    this.searchTerm = value;
    console.log('Searching for:', this.searchTerm);
  }

  onAdd() {
    console.log('Add button clicked');
  }

  onNotifications() {
    console.log('Notifications clicked');
  }

  onProfileClick() {
    console.log('Profile clicked');
  }

  onSettingsClick() {
    console.log('Settings clicked');
  }

  onLogout() {
    console.log('Logout clicked');
  }

  getUserInitials(): string {
    const names = this.currentUser.name.split(' ');
    return names.map(name => name.charAt(0)).join('').toUpperCase().substring(0, 2);
  }
}
