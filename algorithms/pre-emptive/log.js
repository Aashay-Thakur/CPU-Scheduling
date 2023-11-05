export default function logProcessStatus(logs) {
	var logContainer = document.querySelector(".log");
	logContainer.innerHTML = "";

	logs.forEach((log) => {
		switch (log[1].status) {
			case "idle":
				logContainer.innerHTML += `<p class="log-item idle">CPU is idle</p>`;
				break;
			case "arrived":
				logContainer.innerHTML += `<p class="log-item arrived">${log[1].process} arrived</p>`;
				break;
			case "started":
				logContainer.innerHTML += `<p class="log-item started">${log[1].process} started at time ${log[0]}</p>`;
				break;
			case "running":
				logContainer.innerHTML += `<p class="log-item running">${log[1].process} running at time ${log[0]}</p>`;
				break;
			case "preempted":
				logContainer.innerHTML += `<p class="log-item preempted">${log[1].process} preempted at time ${log[0]}</p>`;
				break;
			case "completed":
				logContainer.innerHTML += `<p class="log-item completed">${log[1].process} completed at time ${log[0]}</p>`;
				break;
			case "allArrived":
				logContainer.innerHTML += `<p class="log-item allArrived">All processes have arrived</p>`;
				break;
			case "allCompleted":
				logContainer.innerHTML += `<p class="log-item allCompleted">All processes have completed</p>`;
				break;
		}
	});
}
