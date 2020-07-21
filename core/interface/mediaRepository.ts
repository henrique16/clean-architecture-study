import { Session } from "../domain/session"
import { Media } from "../domain/media"

export interface MediaRepository {
    set(media: Media): Promise<void>
    getSavedSessions(sessions: Session[]): Promise<Session[]>
}