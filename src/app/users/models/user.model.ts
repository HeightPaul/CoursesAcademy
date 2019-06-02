export default interface UserInterface {
	id: number;
	name: string;
	username: string;
	email: string;
	password: string;
	picture?: string;
	isBlocked: string;
	role: string;
}