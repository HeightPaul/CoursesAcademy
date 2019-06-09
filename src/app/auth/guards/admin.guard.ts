import { Injectable } from '@angular/core';
import { Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import UserInterface from 'src/app/users/models/user.model';
import AuthService from '../auth.service';

@Injectable({
	providedIn: 'root'
})
export class AdminGuard {
	user: UserInterface;

	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
		if (this.authService.getLoggedUser().role !== 1) {
			this.router.navigateByUrl('courses/list');
		}
		return true;
	}
}
