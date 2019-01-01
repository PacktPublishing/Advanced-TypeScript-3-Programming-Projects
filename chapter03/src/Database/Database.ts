import { ITable } from './TableBuilder';

export class Database<T> {

    private readonly indexDb: IDBFactory;
    private database: IDBDatabase | null = null;
    private readonly table: ITable;

    constructor(table: ITable) {
        this.indexDb = window.indexedDB;
        this.table = table;
        this.OpenDatabase();
    }

    public Create(state: T): void {
        const dbStore = this.GetObjectStore();
        dbStore!.add(state);
    }

    public Read(callback: (value: T) => void) {
        const dbStore = this.GetObjectStore();

        const request: IDBRequest = dbStore!.openCursor();
        request.onsuccess = (e: any) => {
            if (e.target.result instanceof IDBCursorWithValue) {
                const cursor: IDBCursorWithValue = e.target.result;
                const result: T = cursor.value;
                callback(result)
                cursor.continue();
            }
        }
    }

    public Update(key : number | string, state: T, callback: () => void) : void {
      const dbStore = this.GetObjectStore();

      const index : IDBIndex = dbStore!.index(this.table.IndexName());
      const request : IDBRequest = index.get(key)
      request.onsuccess = (e: any) => {
        const innerRequest : IDBRequest = dbStore!.put(state);
        innerRequest.onsuccess = () => {
          callback();
        }
      }
  }

    public Delete(idx: number | string, callback: () => void) {
        const dbStore = this.GetObjectStore();

        const request : IDBRequest = dbStore!.delete(idx.toString());
        request.onsuccess = () => {
          callback();
        }
    }

    private OpenDatabase(): void {
        const open = this.indexDb.open(this.table.Database(), this.table.Version());
        open.onupgradeneeded = (e: any) => {
            this.UpgradeDatabase(e.target.result);
        }
        open.onsuccess = (e: any) => {
            this.database = e.target.result;
        }
    }

    private UpgradeDatabase(database: IDBDatabase) {
        this.database = database;
        this.table.Build(this.database);
    }

    private GetObjectStore(): IDBObjectStore | null {
        try {
            const transaction: IDBTransaction = this.database!.transaction(this.table.TableName(), "readwrite");
            const dbStore: IDBObjectStore = transaction.objectStore(this.table.TableName());
            return dbStore;
        } catch (Error) {
            return null;
        }
    }

}