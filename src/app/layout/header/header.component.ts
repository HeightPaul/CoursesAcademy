import { Component, OnInit } from '@angular/core';
import AuthService from 'src/app/auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(private authService: AuthService) { }

	ngOnInit() {
	}

	get isSigned(): boolean {
		return this.authService.getLoggedUser() !== null;
	}

	onClickLogout(): void{
		this.authService.logout();
	}

	get signedUser(){
		return this.authService.getLoggedUser();
	}
}
