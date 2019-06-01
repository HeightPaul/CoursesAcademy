import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import CourseInterface from '../models/course.model';
import CoursesService from '../courses.service';
import AuthService from 'src/app/auth/auth.service';

@Component({
	selector: 'app-course-card',
	templateUrl: './course-card.component.html',
	styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

	@Input() course: CourseInterface;
	@Output() onDelete: EventEmitter<number> = new EventEmitter();

	constructor(private router: Router,
				private coursesService: CoursesService,
				private authService: AuthService) { }

	ngOnInit() {
	}

	onDeleteClicked() {
		this.onDelete.emit(this.course.id);
	}

	onCourseEdit() {
		this.router.navigate(['courses/add', this.course.id]);
	}

	onAssignClick() {
		const userId = this.authService.getLoggedUser().id;
		this.course.assigneeId = userId.toString();

		this.coursesService.assignTask(this.course).subscribe(() => {
			console.log('SUCCESS ASSIGN');
		});
	}
}
