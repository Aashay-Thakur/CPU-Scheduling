export default function logProcessStatus(processId, time, status) {
	return;
	switch (status) {
		case "arrived":
			console.log(`%cProcess ${processId} arrived at ${time}`, "color: red");
			break;
		case "started":
			console.log(`%cProcess ${processId} started at ${time}`, "color: violet");
			break;
		case "running":
			console.log(`Process ${processId} is running at ${time}`);
			break;
		case "preempted":
			console.log(`%cProcess ${processId} is preempted at ${time}`, "color: blue");
			break;
		case "completed":
			console.log(`%cProcess ${processId} is completed at ${time}`, "color: green");
			break;
		case "idle":
			console.log(`CPU is idle at ${time}`);
			break;
		default:
			break;
	}
}
