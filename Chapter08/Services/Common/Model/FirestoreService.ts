import { IPerson } from '../../People/api/Models/People';
import firebase from "firebase";
import { Guid } from "guid-typescript";
import { IDatabaseModelBase } from './DatabaseModelBase';
export abstract class FirestoreService<T extends IDatabaseModelBase> {
  constructor(private collection: string) {
  }
  public async Get(id: string): Promise<IPerson> {
    const qry = await firebase.firestore().collection(this.collection).doc(id).get();
    return <IPerson>qry.data();
  }
  public async GetAll(): Promise<T[]> {
    const qry = await firebase.firestore().collection(this.collection).get();
    const people: T[] = new Array<T>();
    qry.forEach(person => {
      people.push(<T>person.data());
    });
    return people;
  }
  public Save(item: T): Promise<T> {
    return new Promise<T>(async (coll) => {
      item.ServerID = Guid.create().toString();
      await firebase.firestore().collection(this.collection).doc(item.ServerID).set(item).then(x => {
        coll(item);
      });
    });
  }
}
