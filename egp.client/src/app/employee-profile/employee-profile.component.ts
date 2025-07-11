import { Component, OnInit, OnDestroy } from '@angular/core';

interface Employee {
  id: string;
  name: string;
  jobTitle: string;
  department: string;
  location: string;
  tenure: string;
  insuranceGroup: string;
  emergencyContact: string;
  phoneNumber: string;
  joiningDate: string;
  employmentStatus: 'Probation' | 'Permanent';
  performanceStatus: 'Good Performer' | 'Average Performer' | 'Needs Improvement';
  avatar: string;
}

interface TimeEntry {
  checkIn?: Date;
  checkOut?: Date;
  totalHours: string;
  status: 'Clocked In' | 'Clocked Out';
}

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit, OnDestroy {
  employee: Employee = {
    id: 'EMP-19091',
    name: 'Muhammad Ejaz',
    jobTitle: 'Software Engineer',
    department: 'IT',
    location: 'Bagh Office',
    tenure: '0 years, 3 months',
    insuranceGroup: 'Premium Health',
    emergencyContact: '+92 *** **34567',
    phoneNumber: '+92 *** **76543',
    joiningDate: '15/03/2022',
    employmentStatus: 'Probation',
    performanceStatus: 'Good Performer',
    avatar: 'assets/images/employee-avatar.jpg'
  };

  timeEntry: TimeEntry = {
    checkIn: new Date('2024-01-15T08:45:00'),
    checkOut: new Date('2024-01-15T17:30:00'),
    totalHours: '8h 45m',
    status: 'Clocked Out'
  };

  currentTime: Date = new Date();
  private timeInterval: any;

  // High-quality SVG fallback images optimized for different sizes
  alternativeAvatars = [
    'assets/images/employee-avatar.jpg',
    'assets/images/profile-pic.jpg',
    'assets/images/default-avatar.png',
    // High-quality scalable SVG user icon (works at any size)
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkMSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmOWZhZmI7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZTVlN2ViO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiByeD0iMTAwIiBmaWxsPSJ1cmwoI2dyYWQxKSIgc3Ryb2tlPSIjZDFkNWRiIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI3NSIgcj0iMzUiIGZpbGw9IiM5Y2EzYWYiLz48cGF0aCBkPSJNNTAgMTYwQzUwIDEzMCA3MiAxMTAgMTAwIDExMFMxNTAgMTMwIDE1MCAxNjBWMTgwSDUwVjE2MFoiIGZpbGw9IiM5Y2EzYWYiLz48dGV4dCB4PSIxMDAiIHk9IjUwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCAnU2Vnb2UgVUknLCBSb2JvdG8sIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI1MDAiIGZpbGw9IiM2YjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkVtcGxveWVlPC90ZXh0Pjwvc3ZnPg==',
    // Clean initials-based avatar (scalable)
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkMiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzM5OGRmOTtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMyNTYzZWI7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9InVybCgjZ3JhZDIpIi8+PHRleHQgeD0iMTAwIiB5PSIxMTUiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIFJvYm90bywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI2MCIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk1FPC90ZXh0Pjwvc3ZnPg=='
  ];

  shiftStart = '09:00 AM';
  shiftEnd = '6:00 PM';
  activeTime = '8:45 Hrs';

  ngOnInit() {
    this.timeInterval = setInterval(() => {
      this.currentTime = new Date();
      this.updateActiveTime();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  onAvatarError() {
    console.log('Avatar failed to load, trying alternatives...');
    const currentIndex = this.alternativeAvatars.indexOf(this.employee.avatar);
    if (currentIndex < this.alternativeAvatars.length - 1) {
      this.employee.avatar = this.alternativeAvatars[currentIndex + 1];
    } else {
      // Final fallback - clear avatar to show placeholder
      this.employee.avatar = '';
    }
  }

  get progressPercentage(): number {
    if (!this.timeEntry.checkIn) return 0;

    const shiftStartTime = new Date();
    shiftStartTime.setHours(9, 0, 0, 0);

    const shiftEndTime = new Date();
    shiftEndTime.setHours(18, 0, 0, 0);

    const totalShiftMs = shiftEndTime.getTime() - shiftStartTime.getTime();

    if (this.timeEntry.checkOut) {
      const workedMs = this.timeEntry.checkOut.getTime() - this.timeEntry.checkIn.getTime();
      return Math.min((workedMs / totalShiftMs) * 100, 100);
    } else {
      const now = new Date();
      const elapsedMs = now.getTime() - this.timeEntry.checkIn.getTime();
      return Math.min((elapsedMs / totalShiftMs) * 100, 100);
    }
  }

  get checkInTime(): string {
    return this.timeEntry.checkIn ?
      this.timeEntry.checkIn.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) :
      '-- : --';
  }

  get checkOutTime(): string {
    return this.timeEntry.checkOut ?
      this.timeEntry.checkOut.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) :
      this.shiftEnd;
  }

  get totalShiftTime(): string {
    return `${this.shiftStart} - ${this.shiftEnd}`;
  }

  getPerformanceClass(): string {
    return this.employee.performanceStatus.toLowerCase().replace(/\s+/g, '-');
  }

  updateActiveTime() {
    if (this.timeEntry.checkIn) {
      const endTime = this.timeEntry.checkOut || new Date();
      const diff = endTime.getTime() - this.timeEntry.checkIn.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      this.timeEntry.totalHours = `${hours}h ${minutes}m`;
      this.activeTime = `${hours}:${minutes.toString().padStart(2, '0')} Hrs`;
    }
  }

  openSecureVault() {
    console.log('Opening Secure Vault...');
  }

  showMoreInfo() {
    console.log('Showing more info...');
  }
}
