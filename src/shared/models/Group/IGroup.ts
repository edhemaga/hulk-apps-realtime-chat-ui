import { IBase } from "../Base/IBase";
import { IMessage } from "../Message/IMessage";

export interface IGroup extends IBase {
    name: string;
    messages: IMessage[];
    members: string[];
}