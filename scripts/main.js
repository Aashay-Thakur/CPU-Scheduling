import M from "materialize-css";
import "../styles/style.scss";
import "materialize-css/dist/css/materialize.min.css";

document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll(".sidenav");
	var instances = M.Sidenav.init(elems, {});

	M.Tabs.init(document.querySelector(".tabs"), {});
	M.FormSelect.init(document.querySelectorAll("select"), {});
});
