export interface Course {
  id: string;
  title: string;
  createDate: Date;
  duration: number;
  description: string;
}

export class CourseMock implements Course {
  readonly id!: string;
  title!: string;
  createDate!: Date;
  duration!: number;
  description!: string;

  constructor(title: string, description: string, duration: number) {
    this.id = Math.random().toString(20).substr(2, 5);
    this.title = title;
    this.description = description;
    this.duration = duration;
    this.createDate = new Date();
  }
}
