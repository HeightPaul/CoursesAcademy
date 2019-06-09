import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminGuard } from '../auth/guards/admin.guard';

export const routes: Routes = [
	{
		path: '',
		component: UsersComponent,
		children: [
			{
				path: 'list',
				component: UsersListComponent
			},
			{
				path: 'add',
				component: AddUserComponent,
				canActivate: [AdminGuard]
			}, 
			{
				path: 'add/:id',
				component: AddUserComponent,
				canActivate: [AdminGuard]
			}
		]
	}
];
