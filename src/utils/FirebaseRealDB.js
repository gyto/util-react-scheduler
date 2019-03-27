// @flow
import firebase from '../config/firebase';

// DATABASE NAMES
export const DATABASE_REF = {
    services: 'services',
};

/**
 * class for Firebase RealTime Database
 */
export default class FirebaseRealDB {
    /**
     * Create Instance with given object
     * @param databaseName
     * @param itemObj
     */
    createInstance(databaseName: string, itemObj: Object) {
        return firebase
            .database()
            .ref(databaseName)
            .push(itemObj);
    }

    /**
     * Read Instance of give Database
     * @param databaseName
     * @returns {firebase.database.Reference}
     */
    readInstance(databaseName: string) {
        return firebase
            .database()
            .ref(databaseName);
    }

    /**
     * Read Single Instance of given Database and objectId
     * @param databaseName
     * @param objectId
     * @returns {firebase.database.Reference}
     */
    readSingleInstance(databaseName: string, objectId: string) {
        return firebase
            .database()
            .ref(`${databaseName}/${objectId}`);
    }

    /**
     * Update Instance with given Database, objectId, and itemObj to update
     * @param databaseName
     * @param objectId
     * @param itemObj
     * @returns {Promise<any>}
     */
    updateInstance(databaseName: string, objectId: string, itemObj: Object) {
        return firebase
            .database()
            .ref(`${databaseName}/${objectId}`)
            .update(itemObj);
    }

    /**
     * Delete Instance with passing objectID
     * @param databaseName
     * @param objectId
     */
    deleteInstance(databaseName: string, objectId: string) {
        return firebase
            .database()
            .ref(`${databaseName}/${objectId}`)
            .remove();
    }
}
