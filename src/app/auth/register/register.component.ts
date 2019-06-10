import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import UsersService from '../../users/users.service';
import { Router } from '@angular/router';
import UserInterface from 'src/app/users/models/user.model';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;

	constructor(private fb: FormBuilder,
		private usersService: UsersService,
		private router: Router) { }

	ngOnInit() {
		this.registerForm = this.fb.group({
			id: [''],
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			username: ['', [Validators.required, Validators.minLength(3)]],
			password: ['', [Validators.required, Validators.minLength(5)]],
			picture: ['https://picsum.photos/200/300', Validators.required],
		});
	}

	onRegister(): void {
		const newUser = { ...this.registerForm.value} as UserInterface;

		this.usersService.getAllUsers().subscribe((users) => {
			const username = newUser.username.toLowerCase();
			const email = newUser.email.toLowerCase();
			if (users.find(u =>
				u.username.toLowerCase() === username ||
				u.email.toLowerCase() === email )) {
				return;
			}

			newUser.isBlocked = false;
			newUser.role = 2;
			this.usersService.addNewUser(newUser)
				.subscribe(() => {
					this.router.navigateByUrl('auth/login');
				});

		});
	}

	get isFormValid(): boolean {
		return this.registerForm.valid;
	}

	get username() {
		return this.registerForm.get('username');
	}

	get password() {
		return this.registerForm.get('password');
	}

	get name() {
		return this.registerForm.get('name');
	}

	get picture() {
		return this.registerForm.get('picture');
	}

	get email() {
		return this.registerForm.get('email');
	}

	get das(){
		return true;
	}
}
