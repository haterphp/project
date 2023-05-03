import { IFileEntity } from "@domain/file"

type SessionId = IDBValidKey
type SessionFiles = 'dictionary' | 'prefix'

interface IGetCompareFileContentResult {
    before: string,
    after: string
}

interface ISessionEntity {
    id: SessionId
    files: Record<SessionFiles, IFileEntity>
    created_at: Date

    getCompareFileContent(): IGetCompareFileContentResult[]
    update(payload: Omit<ISessionEntity, 'id' | 'created_at'>): void
}

type IUpdateSessionEntityPayload = Partial<Pick<ISessionEntity, "files">>
type ICreateSessionEntityPayload = Omit<ISessionEntity, 'update' | 'getCompareFileContent'>

export type { 
    ISessionEntity, 
    ICreateSessionEntityPayload, 
    SessionFiles, 
    IUpdateSessionEntityPayload,
    IGetCompareFileContentResult
}