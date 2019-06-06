import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import CoursesService from '../courses.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-add-course',
	templateUrl: './add-course.component.html',
	styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

	courseForm: FormGroup;

	constructor(private fb: FormBuilder,
							private coursesService: CoursesService,
							private router: Router,
							private route: ActivatedRoute) {

		this.route.params.subscribe((params) => {

			if (params.id) {
				this.coursesService.getById(params.id)
				.subscribe((course) => {
					this.createForm();

					this.courseForm.patchValue({...course});
				});
			}
		});
		
		this.createForm();
	 }

	ngOnInit() {
	}
	
	private createForm(): void {
		this.courseForm = this.fb.group({
			id: [''],
			title: ['', Validators.minLength(2)],
			description:['', Validators.minLength(10)],
			rating: ['1', Validators.pattern('^[1-9][0-9]?$|^100$')]
		});
	}

	onFormSubmit(): void {
		this.courseForm.value['rating'] = parseInt( this.courseForm.value['rating'] );

		this.coursesService.addNewCourse(this.courseForm.value)
		.subscribe(() => {
			console.log('COURSE CREATED');
			this.router.navigateByUrl('courses/list');
		})
	}

	get isFormValid(): boolean {
		return this.courseForm.valid;
	}

	get title() {
		return this.courseForm.get('title');
	}

	get description() {
		return this.courseForm.get('description');
	}

	get rating() {
		return this.courseForm.get('rating');
	}
}
