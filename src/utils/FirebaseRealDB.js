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
     * @param instanceName
     * @param itemObj
     */
    createInstance(instanceName: string, itemObj: Object) {
        return firebase
            .database()
            .ref(instanceName)
            .push(itemObj);
    }

    /**
     * Read Instance of give Database
     * @param instanceName
     * @returns {firebase.database.Reference}
     */
    readInstance(instanceName: string) {
        return firebase
            .database()
            .ref(instanceName);
    }

    /**
     * Read Single Instance of given Database and objectId
     * @param instanceName
     * @param objectId
     * @returns {firebase.database.Reference}
     */
    readSingleInstance(instanceName: string, objectId: string) {
        return firebase
            .database()
            .ref(`${instanceName}/${objectId}`);
    }

    /**
     * Update Instance with given Database, objectId, and itemObj to update
     * @param instanceName
     * @param objectId
     * @param itemObj
     * @returns {Promise<any>}
     */
    updateInstance(instanceName: string, objectId: string, itemObj: Object) {
        return firebase
            .database()
            .ref(`${instanceName}/${objectId}`)
            .update(itemObj);
    }

    /**
     * Delete Instance with passing objectID
     * @param instanceName
     * @param objectId
     */
    deleteInstance(instanceName: string, objectId: string) {
        return firebase
            .database()
            .ref(`${instanceName}/${objectId}`)
            .remove();
    }
}
