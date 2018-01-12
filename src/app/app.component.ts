import { Component, OnInit } from '@angular/core';
import { VoteService } from './vote.service';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  survey = {
    country: '',
    gender: '',
    rating: 0
  }

  chartdata: boolean = false;

  ratingsCount = [];
  ratingData = [];
  totalCount = 0;
  actualRating;

  xAxisLabel = "Number of entries";
  yAxisLabel = "Rating"

  //Chart
  view: any[] = [500, 300];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#8A2BE2', '#4169E1']
  };
  showLabels = true;
  

  constructor(private vote: VoteService) {}

  saveEntry() {
    this.vote.saveEntry(this.survey);
  }

  ngOnInit() {
    this.vote.getAllEntries().subscribe((results) => {
      this.chartdata = true;
      this.processData(results);
    })
  }

  onSelect(event) {
    console.log(event);
  }

  processData(entries) {

    this.ratingData = [];
    this.ratingsCount = [];
    this.totalCount = 0;

    entries.forEach(element => {
      if (this.ratingsCount[element.rating])
        this.ratingsCount[element.rating] += 1;
      else
        this.ratingsCount[element.rating] = 1;
    });
    for (var key in this.ratingsCount) {
      let singleentry = {
        name: key + ' star',
        value: this.ratingsCount[key]
      }
      this.ratingData.push(singleentry);
    }

    for (var key in this.ratingsCount) {
      if (key == '5') {
        this.totalCount += this.ratingsCount[key] * 5;
      }
      else if (key == '4') {
        this.totalCount += this.ratingsCount[key] * 4;
      }
      else if (key == '3') {
        this.totalCount += this.ratingsCount[key] * 3;
      }
      else if (key == '2') {
        this.totalCount += this.ratingsCount[key] * 2;
      }
      else 
        this.totalCount += this.ratingsCount[key];
      
    }

    this.actualRating = (this.totalCount / entries.length).toFixed(2);

  }

}
