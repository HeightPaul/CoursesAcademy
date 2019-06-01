import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import CourseInterface from '../models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  @Input() course: CourseInterface;
  @Output() onDelete: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onDeleteClicked() {
    this.onDelete.emit(this.course.id);
  }

  onCourseEdit() {
    this.router.navigate(['courses/add', this.course.id]);
  }
}
