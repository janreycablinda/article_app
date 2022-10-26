import { User } from "./auth/user.model"

export interface UserData {
    username: string,
    password: string
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