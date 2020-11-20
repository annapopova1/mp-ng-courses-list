export interface Course {
  id: string;
  title: string;
  createDate: Date;
  duration: number;
  description: string;
}

export class CourseMock implements Course {
  readonly id!: string;
  createDate!: Date;

  constructor(public title: string, public description: string, public duration: number) {
    this.id = Math.random().toString(20).substr(2, 5);
    this.createDate = new Date();
  }
}
