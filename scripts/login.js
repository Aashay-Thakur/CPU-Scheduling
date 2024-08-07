import { auth } from "../firebase-config.js";
import {
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import "../styles/login.scss";

const link = document.querySelector(".google-link");

async function getAuthStatus() {
	return new Promise(resolve => {
		onAuthStateChanged(auth, user => {
			try {
				resolve(user);
			} catch (error) {
				resolve(null);
			}
		});
	});
}

document.addEventListener("DOMContentLoaded", async function () {
	const user = await getAuthStatus();
	if (user) {
		window.location.href = "/";
	}
});

function setErrorLine(error) {
	const errorLine = document.querySelector(".error-line");
	errorLine.textContent = error;
}

link.addEventListener("click", async function () {
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		if (user) {
			window.location.href = "/";
		}
	} catch (error) {
		console.error(error);
		if (error.code === "auth/popup-closed-by-user") {
			setErrorLine("Popup closed by user");
		}

		if (error.code === "auth/admin-restricted-operation") {
			setErrorLine("You are not authorized to use this website");
		}
	}
});
