export default function logProcessStatus(logs) {
	var logContainer = document.querySelector(".log");
	logContainer.innerHTML = "";

	logs.forEach((log) => {
		switch (log[1].status) {
			case "idle":
				logContainer.innerHTML += `<p class="log-item idle">CPU is idle</p>`;
				break;
			case "arrived":
				logContainer.innerHTML += `<p class="log-item arrived"><span class="${log[1].process.toLowerCase()}log">${
					log[1].process
				}</span> arrived</p>`;
				break;
			case "started":
				logContainer.innerHTML += `<p class="log-item started"><span class="${log[1].process.toLowerCase()}log">${
					log[1].process
				}</span> started at time ${log[0]}</p>`;
				break;
			case "running":
				logContainer.innerHTML += `<p class="log-item running"><span class="${log[1].process.toLowerCase()}log">${
					log[1].process
				}</span> running at time ${log[0]}</p>`;
				break;
			case "preempted":
				logContainer.innerHTML += `<p class="log-item preempted"><span class="${log[1].process.toLowerCase()}log">${
					log[1].process
				}</span> preempted at time ${log[0]}</p>`;
				break;
			case "completed":
				logContainer.innerHTML += `<p class="log-item completed"><span class="${log[1].process.toLowerCase()}log">${
					log[1].process
				}</span> completed at time ${log[0]}</p>`;
				break;
			case "allArrived":
				logContainer.innerHTML += `<p class="log-item allArrived">All processes have arrived</p>`;
				break;
			case "allCompleted":
				logContainer.innerHTML += `<p class="log-item allCompleted">All processes have completed</p>`;
				break;
		}
		if (log[1].currentExecutionTime) {
			logContainer.lastChild.innerHTML += `. <span class="currentExecutionTime">Total Time Executed: ${log[1].currentExecutionTime}</span>`;
		}
		if (log[1].reason) {
			logContainer.lastChild.innerHTML += `. <span class="reason">${log[1].reason.replace(
				/P\d+/,
				(match) => `<span class="${match.toLowerCase()}log">${match}</span>`
			)}</span>`;
		}
	});
}
