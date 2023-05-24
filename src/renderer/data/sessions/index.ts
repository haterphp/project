import { IndexedDBService } from "@data/db";
import { IOpenTransactionResult } from "@data/db/interfaces";
import { ICreateSessionPayload, ISessionRepository, ISessionEntity } from "@domain/session";

class SessionRepository implements ISessionRepository {
  private _dbService: IndexedDBService;

  constructor() {
    this._dbService = new IndexedDBService("store", 1, [
      {
        name: "sessions",
        options: { autoIncrement: true, keyPath: "id" },
        fields: [
          { name: "files_idx", keyPath: "files" },
          { name: "created_at_idx", keyPath: "created_at" },
        ],
      },
    ]);
  }

  public async getAll(): Promise<ISessionEntity[]> {
    const { store } = await this._openRequest();
    return await store.getAll()
  }

  public async getOne(id: ISessionEntity['id']): Promise<ISessionEntity> {
    const { store } = await this._openRequest();    
    return await store.get(id)
  }

  public async create (payload: ICreateSessionPayload): Promise<ISessionEntity['id']> {
    const { store } = await this._openRequest();
    return await store.add(payload)
  } 

  private async _openRequest(): Promise<IOpenTransactionResult> {
    const db = await this._dbService.open()
    return this._dbService.openObjectStore(db, "sessions");
  }
}

export { SessionRepository };
