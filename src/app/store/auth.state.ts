export interface User {
    name: string,
    email: string,
    access_token?: string,
};

export interface UserData {
    username: any,
    password: any,
    remember?: boolean
};

export interface CurrentUserState {
    user: User,
    token: string
}

export interface AuthResponsData {
    access_token: string;
    expires_in: number;
    token_type: string;
}