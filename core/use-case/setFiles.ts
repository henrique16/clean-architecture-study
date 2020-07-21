import { FileRepository } from "../interface/fileRepository"

export class SetFiles {
    private dirPath: string
    private fileRepository: FileRepository

    public constructor(dirPath: string, fileRepository: FileRepository) {
        this.dirPath = dirPath
        this.fileRepository = fileRepository
    }

    public async set(): Promise<void> {
        try {
            await this.fileRepository.set(this.dirPath)
            return Promise.resolve()
        }
        catch (error) {
            return Promise.reject(error)
        }
    }
}