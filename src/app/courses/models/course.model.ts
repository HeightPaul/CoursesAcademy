import AssigneeInterface from './assignee.model';

export default interface CourseInterface {
	id: number;
	title?: string;
	description?: string;
	rating?: number;
	assignees: AssigneeInterface[];
}