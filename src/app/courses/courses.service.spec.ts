import { HttpClient } from '@angular/common/http';
import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    service = new CoursesService({} as HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
