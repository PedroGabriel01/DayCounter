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
  totalSeconds: number = 0;
  totalMinutes: number = 0;
  totalHours: number = 0;
  totalDays: number = 0;
  totalWeeks: number = 0;
  totalMonths: number = 0;
  totalYears: number = 0;

  stimeToDate: String = "00/00/00 00:00:00";

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
      let date1 = moment(this.selectedDate);
      let date2 = moment();
      // const date2 = moment('2023-01-20', 'yyyy-MM-DD');

      if (!date1.isSameOrAfter(date2)) {
        let dateAux = date2.clone();
        date2 = date1.clone();
        date1 = dateAux.clone();
      }

      this.timer(date1, date2);
      this.total(date1, date2);
      this.calculate();
    }, 1000);
  }

  timer(date1: moment.Moment, date2: moment.Moment) {
    let seconds = date1.diff(date2, "seconds");
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    
    seconds = Math.floor(seconds % 60);
    minutes = Math.floor(minutes % 60);
    hours = Math.floor(hours % 24);
    let month = date1.diff(date2, "months");
    month = month % 12;

    console.log(date1.date());

    if (date1.date() >= date2.date()) {
      days = date1.date() - date2.date();
    } else {
      const daysToTheEndOfMonth = date2.daysInMonth() - date2.date();
      days = date1.date() + daysToTheEndOfMonth;
    }

    let year = date1.diff(date2, "years");

    this.stimeToDate = `${days.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year.toString().padStart(4, "0")} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  total(date1: moment.Moment, date2: moment.Moment) {
    this.totalSeconds = date1.diff(date2, "seconds");
      this.totalMinutes = date1.diff(date2, "minutes");
      this.totalHours = date1.diff(date2, "hours");
      this.totalDays = date1.diff(date2, "days");
      this.totalWeeks = date1.diff(date2, "weeks");
      this.totalMonths = date1.diff(date2, "months");
  }
}
