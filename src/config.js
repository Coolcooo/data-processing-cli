import {up} from "./handlers/up";
import {cd} from "./handlers/cd";
import {ls} from "./handlers/ls";
import {csvToJson} from "./handlers/csv-to-json";
import {jsonToCsv} from "./handlers/json-to-csv";
import {count} from "./handlers/count";
import {hash} from "./handlers/hash";
import {hashCompare} from "./handlers/hash-compare";
import {encrypt} from "./handlers/encrypt";
import {invalidInput} from "./events/invalid-input";
import {initialCommand} from "./events/initial-command";
import {exit as exitEvent} from "./events/exit";
import {exit as exitHandler} from "./handlers/exit";
import {errorCommand} from "./events/error-command";

export const config = {
	commands: {
		"up": {
			handler: up
		},
		"cd": {
			arguments: [
				{
					name: "path",
					required: true,
					type: String
				}
			],
			handler: cd
		},
		"ls": {
			handler: ls
		},
		"csv-to-json": {
			options: {
				required: {
					"input": {
						type: String
					},
					"output": {
						type: String
					}
				}
			},
			handler: csvToJson
		},
		"json-to-csv": {
			options: {
				required: {
					"input": {
						type: String
					},
					"output": {
						type: String
					}
				}
			},
			handler: jsonToCsv
		},
		"count": {
			options: {
				required: {
					"input": {
						type: String
					}
				}
			},
			handler: count
		},
		"hash": {
			options: {
				required: {
					"input": {
						type: String
					},
				},
				optional: {
					"algorithm": {
						type: String
					},
					"save": {
						type: Boolean
					}
				}
			},
			handler: hash
		},
		"hash-compare": {
			options: {
				required: {
					"input": {
						type: String
					},
					"hash": {
						type: String
					},
				},
				optional: {
					"algorithm": {
						type: String
					}
				}
			},
			handler: hashCompare
		},
		"encrypt": {
			options: {
				required: {
					"input": {
						type: String
					},
					"output": {
						type: String
					},
					"password": {
						type: String
					}
				}
			},
			handler: encrypt
		},
		"decrypt": {
			options: {
				required: {
					"input": {
						type: String
					},
					"output": {
						type: String
					},
					"password": {
						type: String
					}
				}
			},
			handler: encrypt
		},
		"log-stats": {
			options: {
				required: {
					"input": {
						type: String
					},
					"output": {
						type: String
					}
				}
			}
		},
		".exit": {
			handler: exitHandler
		}
	},
	events: {
		init: {
			handler: initialCommand
		},
		exit: {
			handler: exitEvent
		},
		errorInput: {
			handler: invalidInput
		},
		errorCommand: {
			handler: errorCommand
		}
	}
};