import { FileRepository } from "../interface/fileRepository"
import _aws from "aws-sdk"
import _config from "../config/index"
import _fs from "fs"
import _path from "path"

export class AwsFileRepository implements FileRepository {
    public async set(dirPath: string): Promise<void> {
        try {
            const credentials = new _aws.SharedIniFileCredentials({ profile: 'default' })
            const bucket = new _aws.S3({
                endpoint: _config.aws.endpoint,
                credentials: credentials
            })
            const fileNames: string[] = _fs.readdirSync(dirPath, "utf-8")
            await Promise.all((fileNames.map(async fileName => {
                let key: string = fileName
                let body: Buffer = _fs.readFileSync(`${dirPath}/${fileName}`)
                await bucket.upload({
                    Bucket: _config.aws.bucket,
                    Key: key,
                    Body: body
                }).promise()
            })))
            return Promise.resolve()
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
}