export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export class UserMock implements User {
  readonly id!: string;
  
  constructor(public firstName: string, public lastName: string) {
    this.id = Math.random().toString(20).substr(2, 5);
  }
}
