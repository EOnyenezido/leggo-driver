console.disableYellowBox = true;
import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAM37fS_Hy9ctfa14r2seiC_E8Pzxt9BNI",
  authDomain: "leggo-38877.firebaseapp.com",
  databaseURL: "https://leggo-38877.firebaseio.com",
  projectId: "leggo-38877",
  storageBucket: "leggo-38877.appspot.com",
  messagingSenderId: "372555364946",
  appId: "1:372555364946:web:560622a31611e985777d8b",
  measurementId: "G-N8PYC20314"
};

firebase.initializeApp(firebaseConfig);

export default firebase;