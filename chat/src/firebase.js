import firebase from "firebase";

// * Initialize Firebase
firebase.initializeApp({
    // * Web app's Firebase configuration
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
const firebaseDb = firebase.database();

function addDataToFirebaseDb(data) {
    firebaseDb.ref('chat/' + data.id).set(data, (err) => {
        if (err)
            console.log(err);
    });
}

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