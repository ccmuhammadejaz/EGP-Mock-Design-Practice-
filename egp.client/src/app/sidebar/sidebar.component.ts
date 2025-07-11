import { Component, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Output() sidebarToggled = new EventEmitter<boolean>();

  isCollapsed = false;
  isMobile = false;

  // Navigation items (keeping your existing structure but more compact)
  mainNavItems = [
    { icon: 'home', label: 'Dashboard', route: '/dashboard', active: true },
    { icon: 'user', label: 'Profile', route: '/profile' },
    { icon: 'phone', label: 'Call', route: '/call' }
  ];

  hrNavItems = [
    { icon: 'money-bill', label: 'Salary', route: '/salary' },
    { icon: 'exclamation-triangle', label: 'Payroll Issue', route: '/payroll' },
    { icon: 'calendar-plus', label: 'Leave', route: '/leave' },
    { icon: 'piggy-bank', label: 'Provident Fund', route: '/provident-fund' },
    { icon: 'envelope', label: 'Letters', route: '/letter' }
  ];

  servicesNavItems = [
    { icon: 'credit-card', label: 'Card Request', route: '/card-request' },
    { icon: 'sign-out-alt', label: 'Resignation', route: '/resignation' },
    { icon: 'clock', label: 'Timing', route: '/timing' },
    { icon: 'hospital', label: 'Medical', route: '/medical', badge: '3' }
  ];

  ngOnInit() {
    this.checkScreenSize();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.isCollapsed = true;
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed);
  }
}
