import { Course, CourseMock } from '../course';
import { CourseItemComponent } from './course-item.component';

const courseItem = new CourseMock('Test title', 'Test description', 100);

describe('CourseItemComponent - class', () => {
  let component: CourseItemComponent;

  beforeEach(async () => {
    component = new CourseItemComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle edit action', () => {
    spyOn(component.editRequest, 'emit');
    component.editItem();
    expect(component.editRequest.emit).toHaveBeenCalled();
  });

  it('should handle delete action', () => {
    spyOn(component.deleteRequest, 'emit');
    component.deleteItem();
    expect(component.deleteRequest.emit).toHaveBeenCalled();
  });
});
