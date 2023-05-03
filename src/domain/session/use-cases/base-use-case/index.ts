import { SessionEntity } from "@domain/session/entity"
import { ICreateSessionEntityPayload, ISessionEntity, ISessionRepository, SessionFiles } from "@domain/session"
import { FileEntity, IFileEntity } from "@domain/file"

class BaseSessionUseCase {

    protected repository: ISessionRepository
    
    constructor(repository: ISessionRepository) {
        this.repository = repository
    }

    protected makeEntity(payload: ICreateSessionEntityPayload): ISessionEntity {
        const files = this._makeFilesEntities(payload.files)

        return new SessionEntity({
            ...payload,
            files
        })
    }

    private _makeFilesEntities(port: Record<SessionFiles, IFileEntity>): Record<SessionFiles, IFileEntity> {
        return Object.keys(port).reduce((obj, key) => {
            const payload = port[key as SessionFiles]
            return { ...obj, [key]: new FileEntity(payload) }
        }, {}) as Record<SessionFiles, IFileEntity>
    }
}

export { BaseSessionUseCase }