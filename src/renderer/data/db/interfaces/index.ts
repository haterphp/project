import { IDBPObjectStore, IDBPTransaction } from "idb";

interface IStoreObject {
  name: string;
  options: IDBObjectStoreParameters;
  fields?: {
    name: string;
    keyPath: string | string[];
    options?: IDBIndexParameters;
  }[];
}

interface IOpenTransactionResult {
  tx: IDBPTransaction<unknown, [string], 'readwrite'>;
  store: IDBPObjectStore<unknown, ArrayLike<string>, string, "readwrite">;
}

export type { IStoreObject, IOpenTransactionResult };
