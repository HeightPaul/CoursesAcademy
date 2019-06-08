import { Component, OnInit } from '@angular/core';
import CourseInterface from '../models/course.model';
import CoursesService from '../courses.service';
import { Router } from '@angular/router';
import AuthService from 'src/app/auth/auth.service';
import UserInterface from 'src/app/users/models/user.model';

@Component({
	selector: 'app-courses-list',
	templateUrl: './courses-list.component.html',
	styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

	user: UserInterface;

	courses: CourseInterface[] = [];

	constructor(private coursesService: CoursesService,
				private authService: AuthService,
				private router: Router) {
		this.user = this.authService.getLoggedUser();
	}

	ngOnInit() {
		this.coursesService.getAllCourses().subscribe((courses) => {
			this.courses = courses;
		});
	}

	onItemDeleted(id: number): void {
		const index = this.courses.findIndex(u => u.id === id);
		if (index !== -1) {
			this.courses.splice(index, 1);
			this.coursesService.deleteCourse(id).subscribe(() => {
				console.log('COURSE DELETED');
			});
		}
	}

	onAddCourse(): void {
		this.router.navigateByUrl('/courses/add');
	}

	get canManipulate(): boolean {
		if( this.user ){
			return this.user.role === 1;
		} else {
			return false;
		}
	}
}
