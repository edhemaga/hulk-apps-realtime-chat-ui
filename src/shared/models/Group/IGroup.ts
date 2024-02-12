import { IBase } from "../Base/IBase";
import { IMessage } from "../Message/IMessage";

export interface IGroup extends IBase {
    name: string;
    messages: IMessage[];
    members: string[];
}

export interface INewGroup {
    name: string;
    members: string[];
}

export interface IGroupWithUserInfo {
    group: IGroup,
    usersInfo: {
        id: string,
        fullname: string
    }[]
}
