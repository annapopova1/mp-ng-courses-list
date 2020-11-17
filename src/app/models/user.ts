export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export class UserMock implements User {
  readonly id!: string;
  readonly firstName!: string;
  readonly lastName!: string;
  
  constructor(firstName: string, lastName: string) {
    this.id = Math.random().toString(20).substr(2, 5);
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
