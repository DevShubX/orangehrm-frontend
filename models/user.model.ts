export interface User {
    _id: string;
    username: string;
    employeeName: string;
    status: 'enabled' | 'disabled';
    userRole: 'admin' | 'ess';
}