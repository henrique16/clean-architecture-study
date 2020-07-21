import { MediaRepository } from "../interface/mediaRepository"
import { Session } from "../domain/session"
import { ConnectionPool, IProcedureResult } from "mssql"
import { Media } from "../domain/media"
import { Connector } from "../sqlServer/connector"

export class SqlServerMediaRepository implements MediaRepository {
    public set(media: Media): Promise<void> {
        throw new Error("Method not implemented.")
    }
    
    public async getSavedSessions(sessions: Session[]): Promise<Session[]> {
        const connector: Connector = new Connector()
        var connectionPool: ConnectionPool | null = null
        try {
            connectionPool = await connector.connect()
            var procs: string = ""
            for (let session of sessions) {
                procs += `exec EXCLUIR1 ${session.id}\n`
            }
            const result: IProcedureResult<any> = await connectionPool
                .request()
                .input("proc", procs)
                .execute("SPExecAllProcs")
            const response: Session[] = []
            for (let iterator of result.recordsets) {
                if (iterator.length > 0) {
                    response.push(new Session(iterator[0].sessionId))
                }
            }
            connector.close(connectionPool)
            return Promise.resolve(response)
        }
        catch (error) {
            connectionPool && connector.close(connectionPool)
            return Promise.reject(error)
        }
    }
}