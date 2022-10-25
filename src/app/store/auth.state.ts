import { User } from "./auth/user.model"

export interface UserData {
    username: string,
    password: string
};

export interface CurrentUserState {
    user: User
}

export interface AuthResponsData {
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId?: string;
}