import { RecordState } from 'src/RecordState';
import { ITable } from './TableBuilder';

export class Database<T extends RecordState> {

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

    public Read() : Promise<T[]> {
        return new Promise((response) => {
            const dbStore = this.GetObjectStore();
            const items : T[] = new Array<T>();
            const request: IDBRequest = dbStore!.openCursor();
            request.onsuccess = (e: any) => {
                const cursor: IDBCursorWithValue = e.target.result;
                if (cursor) {
                    const result: T = cursor.value;
                    if (result.IsActive) {
                        items.push(result);
                    }
                    cursor.continue();
                } else {
                    // When cursor is null, that is the point that we want to return back to our calling code. 
                    response(items);
                }
            }
        });
    }

    public Update(state: T) : Promise<void> {
        return new Promise((resolve) =>
        {
            const dbStore = this.GetObjectStore();
            const innerRequest : IDBRequest = dbStore!.put(state);
            innerRequest.onsuccess = () => {
              resolve();
            }        
        });
    }

    /*
    Note, we aren't actually calling this method of deleting. This version physically deletes the record from
    the database. The way that we are deleting the record in this application is by setting the IsActive flag to false,
    which will be ignored when we read the record.
    */
    public Delete(idx: number | string) : Promise<void> {
        return new Promise((resolve) =>
        {
            const dbStore = this.GetObjectStore();
            const innerRequest : IDBRequest = dbStore!.delete(idx.toString());
            innerRequest.onsuccess = () => {
              resolve();
            }        
        });
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