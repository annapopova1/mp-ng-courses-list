import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'cl-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements AfterViewInit, OnDestroy {
  @Output() searchRequest = new EventEmitter<string>();
  @ViewChild('searchInput') input!: ElementRef<HTMLInputElement>;

  inputSubscription!: Subscription;

  ngAfterViewInit(): void {
    this.inputSubscription = fromEvent(this.input.nativeElement, 'keyup').pipe(
      map(() => this.input.nativeElement.value),
      filter(text => text.length === 0 || text.length > 2),
      distinctUntilChanged(),
      debounceTime(250),
    ).subscribe((text) => this.searchRequest.emit(text));
  }

  ngOnDestroy(): void {
    if (this.inputSubscription) {
      this.inputSubscription.unsubscribe();
    }
  }
}
