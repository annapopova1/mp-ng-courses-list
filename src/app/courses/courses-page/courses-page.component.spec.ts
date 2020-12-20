import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseMock } from '../course';
import { CoursesService } from '../courses.service';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { CoursesPageComponent } from './courses-page.component';

const c0 = new CourseMock('Tile', 'Description', 100, true);
const c1 = new CourseMock('Tile 1', 'Description 1', 40, false);
c1.createDate = new Date(c1.createDate.getTime() + 2 * 24 * 60 * 1000);
const c2 = new CourseMock('Tile 2', 'Description 2', 140, false);
c2.createDate = new Date(c2.createDate.getTime() - 15 * 24 * 60 * 1000);
const courses = [c0, c1, c2];

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of({action: true})
    };
  }
}

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let dialog: MatDialog;
  let coursesService: CoursesService;

  beforeEach(async () => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', [
      'getCourses',
      'createCourse',
      'getCourseById',
      'updateCourse',
      'removeCourse'
    ]);
    coursesServiceSpy.getCourses.and.returnValue(courses);

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ CoursesPageComponent, OrderByPipe ],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy },
        { provide: MatDialog, useClass: MatDialogMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    coursesService = TestBed.inject(CoursesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle edit course action', () => {
    spyOn(console, 'log');
    const courseItem = new CourseMock('Test title', 'Test description', 100);
    component.editCourse(courseItem);
    expect(console.log).toHaveBeenCalledWith('edit', courseItem);
  });

  it('should handle delete course action', () => {
    spyOn(dialog, 'open').and.callThrough();
    const id = '123';
    component.deleteCourse(id);
    expect(dialog.open).toHaveBeenCalled();
    expect(coursesService.removeCourse).toHaveBeenCalledWith(id);
  });
});
