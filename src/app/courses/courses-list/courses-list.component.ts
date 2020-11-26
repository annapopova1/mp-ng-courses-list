import { Component, OnInit } from '@angular/core';
import { CourseMock } from '../course';

@Component({
  selector: 'cl-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  constructor() { }

  courses = [
    new CourseMock('Tile', 'Description', 100),
    new CourseMock('Tile 1', 'Description 1', 40),
    new CourseMock('Tile 2', 'Description 2', 140)
  ];

  ngOnInit(): void {
  }

  loadMore() {
    console.log('click on Load More btn');
  }
}
