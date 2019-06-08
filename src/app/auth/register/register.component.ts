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
			password: ['', [Validators.required, Validators.maxLength(5)]],
			picture: ['https://picsum.photos/200/300', Validators.required],
		});
	}

	onRegister(): void {
		const newUser = { ...this.registerForm.value} as UserInterface;
		newUser.isBlocked = false;
		newUser.role = 2;

		this.usersService.getAllUsers().subscribe((users) => {
			const username = newUser.username.toLowerCase();
			if (users.find(u => u.username.toLowerCase() === username)) {
				return;
			}

			this.usersService.addNewUser(newUser)
				.subscribe(() => {
					this.router.navigateByUrl('auth/login');
				});

		});
	}
}
