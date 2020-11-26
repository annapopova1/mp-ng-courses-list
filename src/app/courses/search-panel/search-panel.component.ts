import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  searchString: string = '';

  constructor() {}

  ngOnInit(): void {
    this.searchString = 'Sushi';
  }

  search() {
    console.log(this.searchString);
  }
}
