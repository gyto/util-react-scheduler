// @flow
import firebase from '../config/firebase';


const DB = firebase.firestore();

/**
 * class for Firebase RealTime Database
 */

export class FirebaseFirestoneDB {
    createInstance(instanceName: string, itemObj: Object) {
        return DB
            .collection(instanceName)
            .add(itemObj)
            .then(docRef => console.log(docRef.id))
            .catch(error => console.log(error));
    }
}
