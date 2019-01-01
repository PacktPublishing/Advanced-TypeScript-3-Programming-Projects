import { StringOrNull } from 'src/Types';

export interface ITableBuilder {
  WithDatabase(databaseName : string) : ITableBuilder;
  WithVersion(version : number) : ITableBuilder;
  WithTableName(tableName : string) : ITableBuilder;
  WithPrimaryField(primaryField : string) : ITableBuilder;
  WithIndexName(indexName : string) : ITableBuilder;
}

export interface ITable {
  Database() : string;
  Version() : number;
  TableName() : string;
  IndexName() : string;
  Build(database : IDBDatabase) : void;
}
export class TableBuilder implements ITableBuilder, ITable {
  private database : StringOrNull;
  private tableName : StringOrNull;
  private primaryField : StringOrNull;
  private indexName : StringOrNull;
  private version : number = 1;

  public WithDatabase(databaseName : string) : ITableBuilder {
    this.database = databaseName;
    return this;
  }

  public WithVersion(versionNumber : number) : ITableBuilder {
    this.version = versionNumber;
    return this;
  }

  public WithTableName(tableName : string) : ITableBuilder {
    this.tableName = tableName;
    return this;
  }

  public WithPrimaryField(primaryField : string) : ITableBuilder {
    this.primaryField = primaryField;
    return this;
  }

  public WithIndexName(indexName : string) : ITableBuilder {
    this.indexName = indexName;
    return this;
  }

  public Database() : string {
    if (!this.database) {
      throw new Error("You must give a database name");
    }
    return this.database;
  }

  public Version() : number {
    return this.version;
  }

  public TableName() : string {
    if (!this.tableName) {
      throw new Error("You must give a table name");
    }
    return this.tableName;
  }

  public IndexName() : string {
    if (!this.indexName) {
      throw new Error("You must specify an index name");
    }
    return this.indexName;
  }

  public Build(database : IDBDatabase) : void {
    if (!this.tableName) {
      throw new Error("You must specify the table name");
    }
    if (!this.primaryField) {
      throw new Error("You must specify a primary field");
    }
    if (!this.indexName) {
      throw new Error("You must specify the index name")
    }

    const parameters : IDBObjectStoreParameters = { keyPath : this.primaryField };
    const objectStore = database.createObjectStore(this.tableName, parameters);
    objectStore!.createIndex(this.indexName, this.primaryField);
  }
}