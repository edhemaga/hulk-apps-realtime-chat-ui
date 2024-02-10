
import { IBase } from "../Base/IBase";
import { IMessage } from "../Message/IMessage";

export interface IUser extends IBase {
    name: string;
    surname: string;
    dob: Date;
    email: string;
    password: string;
    messages: IMessage[];
}

export interface IUserRegistration extends IUser {
    confirmedPassword: string;
}

export interface IUserLogin {
    username: string;
    password: string;
}