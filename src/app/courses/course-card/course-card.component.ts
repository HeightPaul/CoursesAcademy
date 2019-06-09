import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import CourseInterface from '../models/course.model';
import CoursesService from '../courses.service';
import AuthService from 'src/app/auth/auth.service';
import AssigneeInterface from '../models/assignee.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-course-card',
	templateUrl: './course-card.component.html',
	styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

	@Input() course: CourseInterface;
	@Output() onDelete: EventEmitter<number> = new EventEmitter();

	ratingForm: FormGroup;
	isLoggedIn: boolean = false;

	constructor(private router: Router,
				private fBuilder: FormBuilder,
				private coursesService: CoursesService,
				private authService: AuthService,
				private route: ActivatedRoute) {
		this.isLoggedIn = this.authService.isLoggedIn();

		this.route.params.subscribe((params) => {
			if (params.id) {
				this.coursesService.getById(params.id)
				.subscribe((course) => {
					this.createForm();

					this.ratingForm.patchValue({...course});
				});
			}
		});
		
		this.createForm();
	}

	ngOnInit() {
	}

	private createForm(): void {
		this.ratingForm = this.fBuilder.group({
			rating: ['1', Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]
		});
	}

	onFormSubmit(): void {
		const user = this.authService.getLoggedUser();

		this.course.assignees.find(a => a.id === user.id).rating = parseFloat(this.ratingForm.value['rating']);
		this.course.rating = this.overallRating(this.course.rating);

		this.coursesService.assignCourse(this.course).subscribe(() => {
			console.log('SUCCESS RATING');
		});
	}

	get isFormValid(): boolean {
		return this.ratingForm.valid;
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
	get canSee(): boolean {
		return this.authService.getLoggedUser() !== null;
	}

	get canManipulate(): boolean {
		if( this.canSee ){
			return this.authService.getLoggedUser().role === 1;
		} else {
			return false;
		}
	}

	get canRate(): boolean{
		if ( this.canSee ){
			const loggedUserId = this.authService.getLoggedUser().id;
			if( this.course.assignees.find( a => a.id === loggedUserId ) ){
				return true;
			};
			return false;
		}
		return false;
	}

	get canRateOnce(): boolean{
		if ( this.canSee ){
			const loggedUserId = this.authService.getLoggedUser().id;
			if( this.course.assignees.find( a => a.rating && a.id === loggedUserId ) ){
				return false;
			};
			return true;
		}
		return true;
	}

	/**
	 * @brief Complex summing of all asignees' ratings and its course rating
	 * 
	 * @param initialRating
	 * 
	 * @return number
	 */
	overallRating(initialRating: number): number{
		let allRatings = 0;
		let raters = 0;
		
		this.course.assignees.forEach(assignee => {
			if (assignee.rating) {
				allRatings += assignee.rating;
				raters++;
			}
		});

		if (initialRating) {
			return (allRatings+initialRating)/(raters+1);
		}
		else{
			return (allRatings)/(raters);
		}
	}
}
