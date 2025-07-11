import { Component, OnInit } from '@angular/core';

export interface PerformanceDataPoint {
  label: string;
  value: number;
  mtdValue: number;
  color: string;
  selected: boolean;
}

export interface WeeklyData {
  week: string;
  values: { [key: string]: number };
}

export interface DisciplinaryData {
  earlyComings: number;
  lateComings: number;
  supervisorPresence: boolean;
}

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})
export class PerformanceChartComponent implements OnInit {
  activeView: 'Individual' | 'Team' | 'Dept' = 'Individual';
  activeTab: 'Performance' | 'Disciplinary Status' = 'Performance';
  selectedFactorIndex: number = 0;

  performanceFactors: PerformanceDataPoint[] = [
    { label: 'Productivity', value: 85, mtdValue: 83, color: '#3b82f6', selected: true },
    { label: 'Knowledge', value: 85, mtdValue: 84, color: '#10b981', selected: false },
    { label: 'Attitude', value: 91, mtdValue: 89, color: '#f59e0b', selected: false },
    { label: 'Actual Time', value: 90, mtdValue: 88, color: '#ef4444', selected: false },
    { label: 'Active Time', value: 88, mtdValue: 86, color: '#8b5cf6', selected: false }
  ];

  weeklyData: WeeklyData[] = [
    {
      week: 'Week 1',
      values: { 'Productivity': 80, 'Knowledge': 82, 'Attitude': 88, 'Actual Time': 85, 'Active Time': 83 }
    },
    {
      week: 'Week 2',
      values: { 'Productivity': 83, 'Knowledge': 84, 'Attitude': 89, 'Actual Time': 87, 'Active Time': 85 }
    },
    {
      week: 'Week 3',
      values: { 'Productivity': 84, 'Knowledge': 83, 'Attitude': 90, 'Actual Time': 89, 'Active Time': 86 }
    },
    {
      week: 'Week 4',
      values: { 'Productivity': 85, 'Knowledge': 85, 'Attitude': 91, 'Actual Time': 90, 'Active Time': 88 }
    }
  ];

  disciplinaryData: DisciplinaryData = {
    earlyComings: 0,
    lateComings: 2,
    supervisorPresence: false
  };

  chartWidth = 300;
  chartHeight = 140;
  chartPadding = { top: 10, right: 10, bottom: 25, left: 25 };

  ngOnInit() {
    this.updateCurrentValues();
  }

  setActiveView(view: 'Individual' | 'Team' | 'Dept') {
    this.activeView = view;
    this.updateChartData();
  }

  setActiveTab(tab: 'Performance' | 'Disciplinary Status') {
    this.activeTab = tab;
  }

  selectFactor(index: number) {
    this.performanceFactors.forEach(factor => factor.selected = false);
    this.performanceFactors[index].selected = true;
    this.selectedFactorIndex = index;
  }

  private updateChartData() {
    const dataVariations = {
      'Individual': {
        'Productivity': [80, 83, 84, 85],
        'Knowledge': [82, 84, 83, 85],
        'Attitude': [88, 89, 90, 91],
        'Actual Time': [85, 87, 89, 90],
        'Active Time': [83, 85, 86, 88]
      },
      'Team': {
        'Productivity': [78, 81, 82, 83],
        'Knowledge': [80, 82, 81, 83],
        'Attitude': [86, 87, 88, 89],
        'Actual Time': [83, 85, 87, 88],
        'Active Time': [81, 83, 84, 86]
      },
      'Dept': {
        'Productivity': [75, 78, 79, 80],
        'Knowledge': [77, 79, 78, 80],
        'Attitude': [83, 84, 85, 86],
        'Actual Time': [80, 82, 84, 85],
        'Active Time': [78, 80, 81, 83]
      }
    };

    const mtdVariations = {
      'Individual': { 'Productivity': 83, 'Knowledge': 84, 'Attitude': 89, 'Actual Time': 88, 'Active Time': 86 },
      'Team': { 'Productivity': 81, 'Knowledge': 82, 'Attitude': 87, 'Actual Time': 86, 'Active Time': 84 },
      'Dept': { 'Productivity': 78, 'Knowledge': 79, 'Attitude': 84, 'Actual Time': 83, 'Active Time': 81 }
    };

    const currentData = dataVariations[this.activeView];
    const currentMtd = mtdVariations[this.activeView];

    this.weeklyData = [
      { week: 'Week 1', values: { 'Productivity': currentData.Productivity[0], 'Knowledge': currentData.Knowledge[0], 'Attitude': currentData.Attitude[0], 'Actual Time': currentData['Actual Time'][0], 'Active Time': currentData['Active Time'][0] } },
      { week: 'Week 2', values: { 'Productivity': currentData.Productivity[1], 'Knowledge': currentData.Knowledge[1], 'Attitude': currentData.Attitude[1], 'Actual Time': currentData['Actual Time'][1], 'Active Time': currentData['Active Time'][1] } },
      { week: 'Week 3', values: { 'Productivity': currentData.Productivity[2], 'Knowledge': currentData.Knowledge[2], 'Attitude': currentData.Attitude[2], 'Actual Time': currentData['Actual Time'][2], 'Active Time': currentData['Active Time'][2] } },
      { week: 'Week 4', values: { 'Productivity': currentData.Productivity[3], 'Knowledge': currentData.Knowledge[3], 'Attitude': currentData.Attitude[3], 'Actual Time': currentData['Actual Time'][3], 'Active Time': currentData['Active Time'][3] } }
    ];

    this.updateCurrentValues();
    this.updateMtdValues(currentMtd);
  }

  private updateCurrentValues() {
    const latestWeek = this.weeklyData[this.weeklyData.length - 1];
    this.performanceFactors.forEach(factor => {
      factor.value = latestWeek.values[factor.label];
    });
  }

  private updateMtdValues(mtdData: { [key: string]: number }) {
    this.performanceFactors.forEach(factor => {
      factor.mtdValue = mtdData[factor.label];
    });
  }

  get selectedFactor(): PerformanceDataPoint {
    return this.performanceFactors[this.selectedFactorIndex];
  }

  getSelectedFactorPath(): string {
    const factor = this.selectedFactor;
    if (!factor) return 'M 0 0';

    const points = this.weeklyData.map((week, index) => {
      const x = this.getWeekX(index);
      const y = this.getValueY(week.values[factor.label]);

      if (isNaN(x) || isNaN(y)) return '';
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }).filter(point => point !== '');

    return points.join(' ') || 'M 0 0';
  }

  getWeekX(weekIndex: number): number {
    const availableWidth = this.chartWidth - this.chartPadding.left - this.chartPadding.right;
    return this.chartPadding.left + (weekIndex * (availableWidth / (this.weeklyData.length - 1)));
  }

  getValueY(value: number): number {
    const clampedValue = Math.max(0, Math.min(100, value));
    const availableHeight = this.chartHeight - this.chartPadding.top - this.chartPadding.bottom;
    return this.chartPadding.top + (availableHeight * (1 - clampedValue / 100));
  }

  getSelectedFactorDataPoints() {
    const factor = this.selectedFactor;
    if (!factor) return [];

    return this.weeklyData.map((week, index) => ({
      x: this.getWeekX(index),
      y: this.getValueY(week.values[factor.label]),
      value: week.values[factor.label],
      week: week.week
    }));
  }

  get overallPerformance(): number {
    const average = this.performanceFactors.reduce((sum, item) => sum + item.value, 0) / this.performanceFactors.length;
    return Math.round(average);
  }

  get overallMtdPerformance(): number {
    const average = this.performanceFactors.reduce((sum, item) => sum + item.mtdValue, 0) / this.performanceFactors.length;
    return Math.round(average);
  }

  get bonusEligibility(): string {
    const mtdAverage = this.overallMtdPerformance;
    return mtdAverage >= 90 ? 'High Bonus' : mtdAverage >= 80 ? 'Standard Bonus' : mtdAverage >= 70 ? 'Low Bonus' : 'No Bonus';
  }

  get bonusColor(): string {
    const mtdAverage = this.overallMtdPerformance;
    return mtdAverage >= 90 ? '#10b981' : mtdAverage >= 80 ? '#3b82f6' : mtdAverage >= 70 ? '#f59e0b' : '#ef4444';
  }

  get disciplinaryScore(): string {
    const score = Math.max(0, 100 - (this.disciplinaryData.lateComings * 10) - (this.disciplinaryData.earlyComings * 5));
    return score > 90 ? 'Excellent' : score > 70 ? 'Good' : score > 50 ? 'Fair' : 'Poor';
  }

  getDisciplinaryColor(): string {
    const score = Math.max(0, 100 - (this.disciplinaryData.lateComings * 10) - (this.disciplinaryData.earlyComings * 5));
    return score > 90 ? '#10b981' : score > 70 ? '#3b82f6' : score > 50 ? '#f59e0b' : '#ef4444';
  }

  get weekLabels(): string[] {
    return this.weeklyData.map(w => w.week);
  }

  get yAxisLabels(): string[] {
    return ['100', '75', '50', '25', '0'];
  }

  get showViewTabs(): boolean {
    return this.activeTab === 'Performance';
  }
}
