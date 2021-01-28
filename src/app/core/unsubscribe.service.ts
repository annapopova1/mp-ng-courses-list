import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class Unsubscriber extends Subject<any> implements OnDestroy {
  ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
