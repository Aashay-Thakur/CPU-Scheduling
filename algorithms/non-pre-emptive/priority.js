export default function priority(data) {
	var sortable = [];
	for (let process in data) {
		sortable.push([process, data[process]]);
	}
	// Sort process by priority
	sortable
		.sort(function (a, b) {
			return a[1].priority - b[1].priority;
		})
		.sort(function (a, b) {
			return a[1].arrivalTime - b[1].arrivalTime;
		});
	console.log(sortable);
}
