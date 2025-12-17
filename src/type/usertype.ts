export interface UserType {
    username: string;
    password: string;
    icon: string;
    role: 'admin' | 'editor' | 'visitor';
}