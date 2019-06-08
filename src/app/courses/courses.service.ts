import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import CourseInterface from './models/course.model';

@Injectable({
	providedIn: 'root'
})
export default class CoursesService {

	constructor(private http: HttpClient) { }

	getAllCourses(): Observable<CourseInterface[]> {
		return this.http.get<CourseInterface[]>('http://localhost:3000/courses');
	}

	deleteCourse(id: number): Observable<any> {
		return this.http.delete('http://localhost:3000/courses/' + id);
	}

	addNewCourse(course: CourseInterface): Observable<any> {
		if (course.id) {
			return this.http.put(`http://localhost:3000/courses/${course.id}`, course)
		}
		return this.http.post('http://localhost:3000/courses', course)
	}

	getById(id: number): Observable<CourseInterface> {
		return this.http.get<CourseInterface>(`http://localhost:3000/courses/${id}`);
	}

	public assignCourse(course: CourseInterface): Observable<any> {
		return this.http.put(`http://localhost:3000/courses/${course.id}`, course);
	}
}
