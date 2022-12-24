import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}

  selectedDate: Date = new Date();
  timeToDate: Date = new Date();
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  days: number = 0;
  weeks: number = 0;
  months: number = 0;

  ngOnInit(): void {
    this.getStorageDate();
    this.calculate();
  }

  getStorageDate() {
    this.setSelectedDate(localStorage.getItem('selectedDate') ?? moment().format('yyyy-MM-DDTHH:mm'));
  }

  setSelectedDate(dateString: string) {
    const date = new Date('0000-00-00T01:01');
    console.log(moment(date).format("yyyy-MM-DDTHH:mm"));
    console.log(new Date(dateString).toString());
    this.selectedDate = new Date(dateString);
    localStorage.setItem('selectedDate', moment(this.selectedDate).format('yyyy-MM-DDTHH:mm'));
  }

  setValueDate() {
    return moment(this.selectedDate).format('yyyy-MM-DDTHH:mm');
  }

  getValue(el: Event) {
    return (el.target as HTMLInputElement).value;
  }

  calculate() {
    setTimeout(() => {
      // console.log(moment(this.selectedDate).subtract(new Date().getTime()).format("yyyy-MM-DDTHH:mm:ss"));
      
      // this.timeToDate = new Date(this.selectedDate.getTime() - new Date().getTime());
      const now = new Date();
      this.timeToDate = new Date(this.selectedDate);
      this.timeToDate.setFullYear(this.timeToDate.getFullYear() - now.getFullYear());
      this.timeToDate.setMonth(this.timeToDate.getMonth() - now.getMonth());
      this.timeToDate.setDate(this.timeToDate.getDate() - now.getDate());
      this.timeToDate.setHours(this.timeToDate.getHours() - now.getHours());
      this.timeToDate.setMinutes(this.timeToDate.getMinutes() - now.getMinutes());
      this.timeToDate.setSeconds(this.timeToDate.getSeconds() - now.getSeconds());
      this.seconds = Math.ceil((this.selectedDate.getTime() - now.getTime()) / 1000);
      this.minutes = Math.ceil(this.seconds / 60);
      this.hours = Math.floor(this.minutes / 60);
      this.days = Math.floor(this.hours / 24);
      this.weeks = Math.floor(this.days / 7);
      // this.months = Math.ceil(this.days)

      this.calculate();
    }, 1000);
  }
}
