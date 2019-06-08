import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import UserInterface from '../models/user.model';
import { Router } from '@angular/router';
import AuthService from 'src/app/auth/auth.service';

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
	styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

	@Input() user: UserInterface;
	@Output() onDelete: EventEmitter<number> = new EventEmitter();


	constructor(private router: Router,
				private authService: AuthService) {
	}

	ngOnInit() {
	}

	getUserImage() {
		return this.user.picture + '?random=' + this.user.id;
	}

	onDeleteClicked() {
		this.onDelete.emit(this.user.id);
	}

	onUserEdit() {
		this.router.navigate(['users/add', this.user.id]);
	}

	get canEdit(): boolean {
		return this.authService.getLoggedUser().role === 1;
	}

	get canDelete(): boolean {
		return this.authService.getLoggedUser().role === 1 && this.user.role !== 1;
	}
}
