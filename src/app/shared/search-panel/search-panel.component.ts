import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
} from 'rxjs/operators';
import { Unsubscriber } from '../../core/unsubscribe.service';

@Component({
  selector: 'cl-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss'],
  providers: [Unsubscriber],
})
export class SearchPanelComponent implements AfterViewInit {
  @Output() searchRequest = new EventEmitter<string>();
  @ViewChild('searchInput') input!: ElementRef<HTMLInputElement>;

  constructor(private unsubscriber: Unsubscriber) {}

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        map(() => this.input.nativeElement.value),
        filter((text) => text.length === 0 || text.length > 2),
        distinctUntilChanged(),
        debounceTime(250),
        takeUntil(this.unsubscriber)
      )
      .subscribe((text) => this.searchRequest.emit(text));
  }
}
