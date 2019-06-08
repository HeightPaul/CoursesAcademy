import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import CourseInterface from '../models/course.model';
import CoursesService from '../courses.service';
import AuthService from 'src/app/auth/auth.service';
import AssigneeInterface from '../models/assignee.model';

@Component({
	selector: 'app-course-card',
	templateUrl: './course-card.component.html',
	styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

	@Input() course: CourseInterface;
	@Output() onDelete: EventEmitter<number> = new EventEmitter();

	isLoggedIn: boolean = false;

	constructor(private router: Router,
				private coursesService: CoursesService,
				private authService: AuthService) {
		this.isLoggedIn = this.authService.isLoggedIn();
	}

	ngOnInit() {
	}

	onDeleteClicked() {
		this.onDelete.emit(this.course.id);
	}

	onCourseEdit() {
		this.router.navigate(['courses/add', this.course.id]);
	}

	onAssignClick() {
		const user = this.authService.getLoggedUser();

		if(user.id)
		{
			if (this.course.assignees.findIndex(u => u.id === user.id) !== -1) 
		return;
		}

		const assignee: AssigneeInterface = {
			name: this.authService.getLoggedUser().name,
			id: user.id
		}
		this.course.assignees.push(assignee);
		
		this.coursesService.assignCourse(this.course).subscribe(() => {
			console.log('SUCCESS ASSIGN');
		});
	};

	get canAssign(): boolean {
		const user = this.authService.getLoggedUser();
	 
		if(!user) return false;
	 
		const userId = user.id;
	 
		return this.course.assignees.findIndex(u => u.id === userId) !== -1;
	}

	get canManipulate(): boolean {
		if( this.authService.getLoggedUser() !== null){
			return this.authService.getLoggedUser().role === 1;
		} else {
			return false;
		}
	}

	get canSee(): boolean {
		if( this.authService.getLoggedUser() !== null){
			return true;
		} else {
			return false;
		}
	}
}
