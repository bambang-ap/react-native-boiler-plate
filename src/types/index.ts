export enum UserRole {
	Admin = 'admin',
	User = 'user',
}

export type User = Record<
	'id' | 'username' | 'password' | 'image' | 'name',
	string
> & {role: UserRole};
