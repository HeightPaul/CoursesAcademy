import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CoursesComponent } from './courses.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { AddCourseComponent } from './add-course/add-course.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [CoursesListComponent, CourseCardComponent, CoursesComponent, AddCourseComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes)
	]
})
export class CoursesModule { }
