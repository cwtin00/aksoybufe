import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDilEgiNvDXXz83Rgi9zoceEVELJ31P5mY",
    authDomain: "aksoymeydan.firebaseapp.com",
    databaseURL: "https://aksoymeydan-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "aksoymeydan",
    storageBucket: "aksoymeydan.firebasestorage.app",
    messagingSenderId: "202494273557",
    appId: "1:202494273557:web:1fca2d48e3293935c3061c"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };