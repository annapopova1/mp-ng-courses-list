export interface Course {
  id: string;
  title: string;
  createDate: Date;
  duration: number;
  description: string;
  topRated: boolean;
}

export class CourseMock implements Course {
  readonly id!: string;
  createDate!: Date;

  constructor(public title: string, public description: string, public duration: number, public topRated: boolean) {
    this.id = Math.random().toString(20).substr(2, 5);
    this.createDate = new Date();
    this.topRated = topRated;
  }
}
