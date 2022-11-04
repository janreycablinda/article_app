import { User } from "./auth/user.model"

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