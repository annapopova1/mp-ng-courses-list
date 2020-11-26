import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  searchString: string = 'Sushi';

  constructor() {}

  ngOnInit(): void {
  }

  search() {
    console.log(this.searchString);
  }
}
