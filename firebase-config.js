import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDcaXuvs6nOBsp4IbM0Z45ngoZ0jz2wpuA",
	authDomain: "scheduling-c5cff.firebaseapp.com",
	projectId: "scheduling-c5cff",
	storageBucket: "scheduling-c5cff.appspot.com",
	messagingSenderId: "399503342339",
	appId: "1:399503342339:web:5ee5ebcca38feb88178736",
	measurementId: "G-H0PKML9GME",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
