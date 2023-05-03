import { IFileEntity } from "@domain/file";
import { 
    ICreateSessionEntityPayload, 
    IGetCompareFileContentResult, 
    ISessionEntity, 
    IUpdateSessionEntityPayload, 
    SessionFiles
} from "../interfaces/entity";

class SessionEntity implements ISessionEntity {
    
    private _id: ISessionEntity['id'];

    private _files: Record<SessionFiles, IFileEntity>;

    private _created_at: Date;

    get id(): ISessionEntity['id'] {
        return this._id
    }

    get files(): Record<SessionFiles, IFileEntity> {
        return this._files
    }

    get created_at(): Date {
        return this._created_at
    }

    constructor(payload: ICreateSessionEntityPayload) {
        this._id = payload.id
        this._files = payload.files
        this._created_at = payload.created_at
    }

    public update(payload: IUpdateSessionEntityPayload): void {
        if (payload.files) this._files = payload.files
    }

    public getCompareFileContent(): IGetCompareFileContentResult[] {
        const dict = this._createArrayFromString(this.files.dictionary.content)
        const prefixes = this._createArrayFromString(this.files.prefix.content)
        
        return Array.from(dict, (word) => {
            let payload = word
            for (const prefix of prefixes) {
                const word_prefix = word.slice(0, prefix.length)                
                if (word_prefix === prefix) {
                    payload = `${prefix}-${word.slice(prefix.length)}`
                    break
                }
            } 
            return { before: word, after: payload }
        })
    }

    private _createArrayFromString(str: string): string[] {
        return str.replaceAll('.', '').split(',').map(item => item.trim())
    }
}

export { SessionEntity }