import { Component, DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CoursePlateBorderDirective } from './course-plate-border.directive';

@Component({
  template: `
    <div [clCoursePlateBorder]="dGreen">green</div>
    <div [clCoursePlateBorder]="dBlue">blue</div>
    <div [clCoursePlateBorder]="dDefault">default</div>
  `
})
class TestComponent {
  currentDate = new Date();
  dGreen = new Date(this.currentDate.getTime() - 13 * 24 * 60 * 1000);
  dBlue = new Date(this.currentDate.getTime() + 2 * 24 * 60 * 1000);
  dDefault = new Date(this.currentDate.getTime() - 14 * 24 * 60 * 1000);
}

describe('CoursePlateBorderDirective', () => {
  let fixture;
  let des: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ CoursePlateBorderDirective, TestComponent ]
    })
    .createComponent(TestComponent);
  
    fixture.detectChanges(); // initial binding
  
    des = fixture.debugElement.queryAll(By.directive(CoursePlateBorderDirective));
  });

  it('should color 1st <div> border "green"', () => {
    const borderBottom = des[0].nativeElement.style.borderBottom;
    expect(borderBottom).toBe('1px solid green');
  });
  
  it('should color 2d <div> border "blue"', () => {
    const borderBottom = des[1].nativeElement.style.borderBottom;
    expect(borderBottom).toBe('1px solid blue');
  });

  it('should not color 3d <div> border', () => {
    const borderBottom = des[2].nativeElement.style.borderBottom;
    expect(borderBottom).toBe('');
  });
});
