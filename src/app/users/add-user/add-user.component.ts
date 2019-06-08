import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import UsersService from '../users.service';
import { Router, ActivatedRoute } from '@angular/router';
import UserInterface from '../models/user.model';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

	userForm: FormGroup;

	constructor(private fb: FormBuilder,
							private usersService: UsersService,
							private router: Router,
							private route: ActivatedRoute) {

		this.route.params.subscribe((params) => {

			if (params.id) {
				this.usersService.getById(params.id)
				.subscribe((user) => {
					this.createForm();

					this.userForm.patchValue({...user});
				});
			}
		});
		
		this.createForm();
	 }

	ngOnInit() {
	}
	
	private createForm(): void {
		this.userForm = this.fb.group({
			id: [''],
			name: ['', Validators.required],
			email:['', [Validators.required, Validators.email]],
			username: ['', [Validators.required, Validators.minLength(3)]],
			password: ['', [Validators.required, Validators.minLength(5)]],
			picture: ['https://picsum.photos/200/300'],
			isBlocked: ['true', Validators.pattern('^(?:tru|fals)e$')],
			role: ['2', Validators.pattern('^(?:1|2)$')]
		});
	}

	onFormSubmit(): void {
		const newUser = { ...this.userForm.value} as UserInterface;
		newUser.isBlocked = ( this.userForm.value['isBlocked'] === 'true' );
		newUser.role = parseInt( this.userForm.value['role'] );

		this.usersService.addNewUser(newUser)
		.subscribe(() => {
			console.log('USER CREATED');
			this.router.navigateByUrl('users/list');
		})
	}

	get isFormValid(): boolean {
		return this.userForm.valid;
	}

	get username() {
		return this.userForm.get('username');
	}

	get password() {
		return this.userForm.get('password');
	}

	get name() {
		return this.userForm.get('name');
	}

	get picture() {
		return this.userForm.get('picture');
	}

	get email() {
		return this.userForm.get('email');
	}

	get isBlocked() {
		return this.userForm.get('isBlocked');
	}

	get role() {
		return this.userForm.get('role');
	}
}
