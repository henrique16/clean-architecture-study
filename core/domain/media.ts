export enum Type {
    undefined = "undefined",
    audio = "audio",
    video = "video",
    screen = "screen"
}

export class Media {
    public feed: number
    public sessionId: number
    public timeStamp: number
    public type: Type

    public constructor(feed: number, sessionId: number, timeStamp: number, type: Type) {
        this.feed = feed
        this.sessionId = sessionId
        this.timeStamp = timeStamp
        this.type = type
    }
}