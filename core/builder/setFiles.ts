import { SetFiles } from "../use-case/setFiles"
import { AwsFileRepository } from "../adapter/awsFileRepository"
import { FileRepository } from "../interface/fileRepository"

export function setFiles(dirPath: string) {
    const fileRepository: FileRepository = new AwsFileRepository()
    const setFiles: SetFiles = new SetFiles(dirPath, fileRepository)
    return setFiles.set()
}