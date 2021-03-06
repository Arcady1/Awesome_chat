import firebase from "firebase";

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
const firebaseDb = firebase.database();

/**
 * Recording new messages to the database
 * 
 * @param {Object} data - User message information
 * @param {Number} data.id - User message Id
 */
function addDataToFirebaseDb(data) {
    firebaseDb.ref('chat/' + data.id).set(data, (err) => {
        if (err)
            console.log(err);
    });
}

/**
 * The function tracks changes in the database and returns an array of objects 
 * containing information about user messages
 * 
 * @returns {Object[]} - Array of objects containing information about messages 
 */
function getDataFromFirebaseDb() {
    let res = [];
    const starCountRef = firebaseDb.ref('chat/');

    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val();

        for (let id in data) {
            res.push({
                id: data[id].id,
                text: data[id].text
            });
        }
    });

    return res;
}

export {
    addDataToFirebaseDb,
    getDataFromFirebaseDb
};