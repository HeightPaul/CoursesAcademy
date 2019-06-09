import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
	title = 'Courses Academy';

	constructor() {
		this.title = 'faudshfdjs';
	}

	ngOnInit() {
	}

	ngDoCheck() {
	}

	getText(): string {
		return this.title;
	}

}
