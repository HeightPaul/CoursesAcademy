import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [AuthComponent, LoginComponent, RegisterComponent],
	imports: [
			ReactiveFormsModule,
			CommonModule,
			RouterModule.forChild(routes)
	]
})
export class AuthModule { }
