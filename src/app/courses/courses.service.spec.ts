import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    service = new CoursesService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
