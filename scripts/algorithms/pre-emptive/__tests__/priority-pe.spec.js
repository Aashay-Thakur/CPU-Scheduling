import priorityPE from "../algorithms/pre-emptive/priority-pe.js";

describe("priorityPE", () => {
  it("should return the processed data with correct order and properties", () => {
    const processes = {
      P1: { arrivalTime: 0, burstTime: 5, priority: 2 },
      P2: { arrivalTime: 1, burstTime: 3, priority: 1 },
      P3: { arrivalTime: 2, burstTime: 4, priority: 3 },
    };
    const options = { reverse: false, quantum: 2 };

    const result = priorityPE(processes, options);

    expect(result).toEqual([
      ["P2", {
        arrivalTime: 1,
        burstTime: 3,
        priority: 1,
        operationalBurstTime: 0,
        preEmptData: {
          startTime: [1],
          endTime: [3],
          executionTime: [2],
        },
        pid: "2",
        order: 1,
        turnAroundTime: 2,
        waitingTime: -1,
        responseTime: 0,
      }],
      ["P1", {
        arrivalTime: 0,
        burstTime: 5,
        priority: 2,
        operationalBurstTime: 0,
        preEmptData: {
          startTime: [0],
          endTime: [5],
          executionTime: [5],
        },
        pid: "1",
        order: 2,
        turnAroundTime: 5,
        waitingTime: 0,
        responseTime: 0,
      }],
      ["P3", {
        arrivalTime: 2,
        burstTime: 4,
        priority: 3,
        operationalBurstTime: 0,
        preEmptData: {
          startTime: [2],
          endTime: [6],
          executionTime: [4],
        },
        pid: "3",
        order: 3,
        turnAroundTime: 4,
        waitingTime: 0,
        responseTime: 0,
      }],
    ]);
  });

  // Add more test cases here...
});