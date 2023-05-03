import { IUseCase } from "@domain/common/interfaces"
import { ISessionEntity } from "@domain/session"
import { BaseSessionUseCase } from "../base-use-case"

interface IGetOneSessionPayload {
    id: ISessionEntity['id']
}  

type IGetOneSessionUseCase = IUseCase<IGetOneSessionPayload, ISessionEntity>

class GetOneSessionUseCase extends BaseSessionUseCase implements IGetOneSessionUseCase {
    public async execute(port: IGetOneSessionPayload): Promise<ISessionEntity> {
        const payload = await this.repository.getOne(port.id)        
        return this.makeEntity(payload)
    }
}

export type { IGetOneSessionUseCase }
export { GetOneSessionUseCase }