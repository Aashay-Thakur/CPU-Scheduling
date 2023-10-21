export default function logProcessStatus(processId, time, status, currentExecutionTime, message) {
	// return;

	var log = document.querySelector(".log");

	switch (status) {
		case "arrived":
			log.innerHTML += `<p class="red-text">Process ${processId} arrived at ${time}</p>`;
			break;
		case "started":
			log.innerHTML += `<p class="purple-text">Process ${processId} started at ${time}${
				currentExecutionTime ? ", Total time Executed: " + currentExecutionTime : ""
			}${message ? `, ${message}` : ""}
			</p>`;
			break;
		case "running":
			log.innerHTML += `<p>Process ${processId} running at ${time}${
				currentExecutionTime ? ", Total time Executed: " + currentExecutionTime : ""
			}${message ? ", " + message : ""}</p>`;
			break;
		case "preempted":
			log.innerHTML += `<p class="blue-text">Process ${processId} preempted at ${time}${
				currentExecutionTime ? ", Total time Executed: " + currentExecutionTime : ""
			}${message ? ", " + message : ""}</p>`;
			break;
		case "completed":
			log.innerHTML += `<p class="green-text">Process ${processId} completed at ${time}${
				currentExecutionTime ? ", Total time Executed: " + currentExecutionTime : ""
			}${message ? ", " + message : ""}</p>`;
			break;
		case "idle":
			log.innerHTML += `<p>CPU is idle at ${time}</p>`;
			break;
		case "allArrived":
			log.innerHTML += `<p class="red-text">All processes arrived at ${time}</p>`;
			break;
		case "allCompleted":
			log.innerHTML += `<p class="green-text">All processes completed at ${time}</p>`;
			break;
		case "clear":
			log.innerHTML = "";
			break;
		default:
			break;
	}
}
