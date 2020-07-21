export interface FileRepository {
    set(dirPath: string): Promise<void>
}