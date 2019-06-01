import { Routes } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesComponent } from './courses.component';
import { AddCourseComponent } from './add-course/add-course.component';

export const routes: Routes = [
    {
        path: '',
        component: CoursesComponent,
        children: [
            {
                path: 'list',
                component: CoursesListComponent
            },
            {
                path: 'add',
                component: AddCourseComponent
            }, 
            {
                path: 'add/:id',
                component: AddCourseComponent
            }
        ]
    }
];
