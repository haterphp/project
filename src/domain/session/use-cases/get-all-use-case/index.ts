import { IUseCase } from "@domain/common/interfaces"
import { ISessionEntity } from "@domain/session"
import { BaseSessionUseCase } from "../base-use-case"

type IGetAllSessionsUseCase = IUseCase<never, ISessionEntity[]>

class GetAllSessionsUseCase extends BaseSessionUseCase implements IGetAllSessionsUseCase {

    public async execute(): Promise<ISessionEntity[]> {
        const payload = await this.repository.getAll()
        return payload.map(item => this.makeEntity(item))
    }
    
}

export type { IGetAllSessionsUseCase }
export { GetAllSessionsUseCase }