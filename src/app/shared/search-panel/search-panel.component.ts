import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cl-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent {
  @Output() searchRequest = new EventEmitter<string>();
  searchString: string = '';

  search() {
    this.searchRequest.emit(this.searchString);
  }
}
