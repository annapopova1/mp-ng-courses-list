import { formatDate } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'cl-date-input',
  templateUrl: './date-input.component.html',
  styles: [
    `
      :host.ng-invalid label {
        color: #f44336;
      }

      :host.ng-invalid input[type='text'] {
        border: 1px solid #f44336;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useValue: (c: FormControl) => {
        let err = {
          formatError: {
            given: c.value,
            format: 'dd/MM/yyyy',
          },
        };
        if (c.value) {
          const m = c.value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
          return m ? null : err;
        }
        return null;
      },
      multi: true,
    },
  ],
})
export class DateInputComponent implements OnInit, ControlValueAccessor {
  private _value!: string;

  get value() {
    return this._value;
  }

  @Input()
  set value(val) {
    this._value = val;
    this.onChange(this._value);
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  ngOnInit(): void {}

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
