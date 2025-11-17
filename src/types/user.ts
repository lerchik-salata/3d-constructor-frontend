export interface User {
    id: string;
    email: string;
    role: 'User' | 'Admin';
}