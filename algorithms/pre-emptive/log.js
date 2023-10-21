export default function logProcessStatus(processId, time, status) {
	// return;

	var log = document.querySelector(".log");

	switch (status) {
		case "arrived":
			log.innerHTML += `<p class="red-text">Process ${processId} arrived at ${time}</p>`;
			break;
		case "started":
			log.innerHTML += `<p class="purple-text">Process ${processId} started at ${time}</p>`;
			break;
		case "running":
			log.innerHTML += `<p>Process ${processId} running at ${time}</p>`;
			break;
		case "preempted":
			log.innerHTML += `<p class="blue-text">Process ${processId} preempted at ${time}</p>`;
			break;
		case "completed":
			log.innerHTML += `<p class="green-text">Process ${processId} completed at ${time}</p>`;
			break;
		case "idle":
			log.innerHTML += `<p>CPU is idle at ${time}</p>`;
			break;
		case "allArrived":
			log.innerHTML += `<p class="red-text">All processes arrived at ${time}</p>`;
			break;
		default:
			break;
	}
}
