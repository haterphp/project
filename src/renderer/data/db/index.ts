import { IDBPDatabase, openDB } from 'idb'
import { IStoreObject } from "./interfaces"
import { IOpenTransactionResult } from './interfaces'

class IndexedDBService {

    protected name: string

    protected version: number

    private _objectStore: IStoreObject[]

    constructor(name: string, version: number, objectStore: IStoreObject[]) {
        if (!('indexedDB' in window)) {
            throw Error('IndexedDB not supported in you Browser')
        }

        this.name = name
        this.version = version
        this._objectStore = objectStore
    }


    public async open(): Promise<IDBPDatabase> {
        return await openDB(this.name, this.version, {
            upgrade: (db) => {
                this._objectStore.forEach((objStore) => {
                    if (!db.objectStoreNames.contains(objStore.name)) {
                        const entity = db.createObjectStore(objStore.name, objStore.options)
                        if (objStore.fields !== undefined) {
                            objStore.fields.forEach(idx => {
                                entity.createIndex(idx.name, idx.keyPath, idx.options)
                            });
                        }
                    }
                })
            }
        })
    }

    public openObjectStore(db: IDBPDatabase, name: string): IOpenTransactionResult {
        const tx = db.transaction(name, 'readwrite')
        const store = tx.objectStore(name) 

        return {
            tx,
            store
        }
    }
}

export { IndexedDBService }