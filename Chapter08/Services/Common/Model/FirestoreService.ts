import firebase from "firebase";
import { Guid } from "guid-typescript";
import { IDatabaseModelBase } from './DatabaseModelBase';
export abstract class FirestoreService<T extends IDatabaseModelBase> {
  constructor(private collection: string) {
  }
  public async Get(id: string): Promise<T> {
    const qry = await firebase.firestore().collection(this.collection).doc(id).get();
    return <T>qry.data();
  }
  public async GetAll(): Promise<T[]> {
    const qry = await firebase.firestore().collection(this.collection).get();
    const items: T[] = new Array<T>();
    qry.forEach((item: any) => {
      items.push(<T>item.data());
    });
    return items;
  }
  public async Save(item: T): Promise<T> {
    return new Promise<T>(async (coll) => {
      item.ServerID = Guid.create().toString();

      await firebase.firestore().collection(this.collection).doc(item.ServerID).set(item);
      /*
      This whole chain could be rewritten as:
      
      const firestore: firebase.firestore.Firestore = firebase.firestore();
      const collection: firebase.firestore.CollectionReference = firestore.collection(this.collection);
      const doc: firebase.firestore.DocumentReference = collection.doc(item.ServerID);
      await doc.set(item);
      */
      coll(item);
    });
  }
}
