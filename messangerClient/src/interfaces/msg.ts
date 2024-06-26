import { Attachment } from "./attachment";

export interface Message{
    id:number;
    text:string;
    from:number;
    dateTime:string;
    attachments:Array<Attachment>|string; 
    isRead:boolean,
}