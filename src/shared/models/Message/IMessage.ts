import { IBase } from "../Base/IBase";

export interface IMessage extends IBase {
    senderId: string;
    groupId?: string;
    content: string;
}