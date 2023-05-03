import { ISessionEntity } from "../entity"
import { ICreateSessionPayload } from "../port"

interface ISessionRepository {
    getAll(): Promise<ISessionEntity[]>
    getOne(id: ISessionEntity['id']): Promise<ISessionEntity>

    create(payload: ICreateSessionPayload): Promise<ISessionEntity['id']>
}

export type { ISessionRepository }