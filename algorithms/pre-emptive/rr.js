const rr = (processes, options) => {
	var sortable = [];
	for (let process in processes) {
		sortable.push([process, processes[process]]);
	}

	let current_time = 0;
	let quantum = options.quantum;
	let FAILSAFE = Number.MAX_VALUE;

	let chartData = [];
	let processedData = [];
	let operationalArray = [...sortable];

	while (true && current_time < FAILSAFE) {}
};

export default rr;
