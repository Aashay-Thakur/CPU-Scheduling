document.addEventListener("DOMContentLoaded", function () {
    var elems = document.querySelectorAll("select");
    var instances = M.FormSelect.init(elems, {});
});

const submit = document.querySelector(".btn");

submit.addEventListener("click", () => {
    var dataElems = document.querySelectorAll(".process");
    var processes = {};
    dataElems.forEach((elem) => {
        var data = elem.children;
        processes[data[0].innerText] = {
            arrivalTime: Number(data[1].firstElementChild.value),
            burstTime: Number(data[2].firstElementChild.value),
        };
    });
    if (document.querySelector("#type").value === "FCFS") fcfs(processes);
    if (document.querySelector("#type").value === "SJF") sjf(processes);
});

const createChart = (data) => {
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
        type: "line",
        data: {
            datasets: data,
        },
        options: {
            maintainAspectRatio: false,
            datasets: {
                line: {
                    borderWidth: 20,
                    pointRadius: 0,
                },
            },
            scales: {
                y: {
                    suggestedMin: 0,
                    display: false,
                },
                xAxis: {
                    type: "linear",
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1,
                    },
                },
            },
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        generateLabels: function (chart) {
                            var data = chart.data;
                            return data.datasets.map((dataset) => {
                                return {
                                    text: dataset.label,
                                    fillStyle: dataset.backgroundColor,
                                    strokeStyle: dataset.legendOutline,
                                    lineWidth: 1,
                                };
                            });
                        },
                    },
                },
            },
        },
    });
};

const fcfs = (data) => {
    var sortable = [];
    for (var process in data) {
        sortable.push([process, data[process]]);
    }
    sortable.sort(function (a, b) {
        return a[1].arrivalTime - b[1].arrivalTime;
    });
    var chartData = [];
    var processedData = [];
    sortable.forEach((process, index) => {
        if (index === 0) {
            process[1].startTime = process[1].arrivalTime;
            process[1].endTime = process[1].burstTime;
        } else {
            process[1].startTime = process[1].arrivalTime <= sortable[index - 1][1].endTime ? sortable[index - 1][1].endTime : process[1].arrivalTime;
            process[1].endTime = process[1].startTime + process[1].burstTime;
        }
        process[1].turnAroundTime = process[1].endTime - process[1].arrivalTime;
        process[1].waitingTime = process[1].turnAroundTime - process[1].burstTime;
        processedData.push(process);

        chartData.push({
            label: process[0],
            data: [
                {
                    x: process[1].startTime,
                    y: 0,
                },
                {
                    x: process[1].endTime,
                    y: 0,
                },
            ],
        });
    });
    document.getElementById("myChart").remove();
    document.getElementById("chartContainer").innerHTML = '<canvas id="myChart"></canvas>';
    document.querySelector(".sub_table").innerHTML = "<h5>FCFS Scheduling Table</h5>";
    document.querySelector(".sub_chart").innerHTML = "<h5>FCFS Scheduling - Gantt Chart</h5>";

    createChart(chartData);
    createTable(processedData);
};

const createTable = (data) => {
    const tableContainer = document.getElementById("processed-data");
    const table = document.createElement("table");
    table.classList.add("centered", "striped");
    table.createTHead();
    const header = table.tHead.insertRow();
    const headerData = ["Process", "Arrival Time", "Burst Time", "Start Time", "End Time", "Turn Around Time", "Waiting Time"];
    headerData.forEach((data) => {
        const cell = document.createElement("th");
        cell.innerText = data;
        header.appendChild(cell);
    });
    const body = table.createTBody();
    data.forEach((process) => {
        const row = body.insertRow();
        const cell = row.insertCell();
        cell.innerText = process[0];
        for (var key in process[1]) {
            const cell = row.insertCell();
            cell.innerText = process[1][key];
        }
    });
    tableContainer.innerHTML = "";
    tableContainer.appendChild(table);

    const averageContainer = document.getElementById("average");
    const averageTurnAround = document.createElement("p");
    averageTurnAround.innerHTML = `Average Turn Around Time: <b>${data.reduce((acc, curr) => acc + curr[1].turnAroundTime, 0) / data.length}</b>`;
    averageContainer.innerHTML = "";
    averageContainer.appendChild(averageTurnAround);

    const averageWaiting = document.createElement("p");
    averageWaiting.innerHTML = `Average Waiting Time: <b>${data.reduce((acc, curr) => acc + curr[1].waitingTime, 0) / data.length}</b>`;
    averageContainer.appendChild(averageWaiting);
};

const sjf = (data) => {
    return 0;
};
