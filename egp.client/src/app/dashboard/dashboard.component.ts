import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-grid">
      <div class="profile-section">
        <app-employee-profile></app-employee-profile>
      </div>
      <div class="chart-section">
        <app-performance-chart></app-performance-chart>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None // This allows styles to affect child components
})
export class DashboardComponent { }
