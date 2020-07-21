import mssql from "mssql"
import _config from "../config/index"

export class Connector {
    public connect(): Promise<mssql.ConnectionPool> {
        const connectionPool: mssql.ConnectionPool = new mssql.ConnectionPool(_config.sqlServer)
        return connectionPool.connect()
    }

    public close(connectionPool: mssql.ConnectionPool): void {
        connectionPool.close(error => error && console.log(error))
    }
}