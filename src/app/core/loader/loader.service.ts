import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isActive = false;

  constructor() { }

  activate() {
    this.isActive = true;
  }

  cancel() {
    this.isActive = false;
  }
}
