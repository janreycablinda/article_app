export interface UserData {
    username: string,
    password: string
};

export interface CurrentUserState {
    name: string,
    email: string,
    access_token?: string,
    remember_toke?: string
}