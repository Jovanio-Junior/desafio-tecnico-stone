// Initialize Cloud Firestore through Firebase
const firebaseConfig = require('../../../database/dbNoSQL')
const {
    initializeApp
} = require("firebase/app")
const {
    getFirestore
} = require("firebase/firestore")
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

module.exports = db