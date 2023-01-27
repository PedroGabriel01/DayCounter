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
      const date1 = moment(this.selectedDate);
      const date2 = moment();

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
    days = Math.floor(days % 24);

    for (let monthCounter = date1.month(); monthCounter < date2.month(); monthCounter++) {
      //Pegar total de dias 
      //Se total de dias for maior ou igual ao número de dias no mês
      //Subtrair esses dias do total de dias e somar 1 mês
    }

    this.stimeToDate = `${days}/00/00 ${hours}:${minutes}:${seconds}`;
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
