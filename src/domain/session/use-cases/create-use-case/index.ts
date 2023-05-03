import { IUseCase } from "@domain/common/interfaces";
import { BaseSessionUseCase } from "../base-use-case";
import { ICreateSessionPayload, ISessionEntity } from "@domain/session/interfaces";
import { IFileEntity } from "@domain/file";
import { ExceptionService } from "@domain/common/service";

type ICreateSessionUseCase = IUseCase<ICreateSessionPayload, ISessionEntity>
type ICreateSessionError = 'created_at' | 'file_dictionary' | 'file_prefix'

class CreateSessionUseCase extends BaseSessionUseCase implements ICreateSessionUseCase {

    public async execute (port: ICreateSessionPayload): Promise<ISessionEntity> {
        this._throwErorrs(port)
    
        const id = await this.repository.create(
            this._transformPort(port)
        );

        return this.makeEntity({
            id,
            ...port
        })
    }

    private _throwErorrs(port: ICreateSessionPayload): void {
        const errors: Partial<Record<ICreateSessionError, string>> = {}

        if (!port.created_at) errors['created_at'] = "Поле created_at обязательно для заполения"
        if (!port.files.dictionary) errors['file_dictionary'] = "Пожалуйста, загрузите файл со словарем"
        if (!port.files.prefix) errors['file_prefix'] = "Пожалуйста, загрузите файл с приставками"

        if (Object.keys(errors).length !== 0) {
            throw ExceptionService.new<ICreateSessionError>({
                status: {
                    code: 100,
                    message: `${this.constructor.name} throw erorrs`
                },
                data: errors
            })
        }
    }

    private _transformPort(port: ICreateSessionPayload): ICreateSessionPayload {
        const getEntityObj = (entity: IFileEntity) => ({
            name: entity.name,
            content: entity.content
        }) 
        
        return {
            files: {
                dictionary: getEntityObj(port.files.dictionary),
                prefix: getEntityObj(port.files.prefix),
            },
            created_at: port.created_at
        }
    }
}

export type { ICreateSessionError }
export { CreateSessionUseCase }