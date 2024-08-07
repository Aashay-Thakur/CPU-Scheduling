import M from "materialize-css";
import "../styles/style.scss";
import "materialize-css/dist/css/materialize.min.css";
import { auth } from "../firebase-config.js";
import { onAuthStateChanged } from "firebase/auth";

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

async function redirect() {
	const user = await getAuthStatus();
	if (!user) {
		if (window.location.pathname !== "/login.html") {
			window.location.href = "/login.html";
		}
	} else {
		if (window.location.pathname === "/login.html") {
			window.location.href = "/";
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll(".sidenav");
	var instances = M.Sidenav.init(elems, {});

	M.Tabs.init(document.querySelector(".tabs"), {});
	M.FormSelect.init(document.querySelectorAll("select"), {});

	redirect();
});
