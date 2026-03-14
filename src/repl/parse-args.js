const SINGLE_QUOTE = 0;
const ARG = 1;
const ESCAPE = 2;
const DOUBLE_QUOTE = 3;

export const parseArgs = (line) => {
	const tokens = [ARG];
	const args = [];
	let currentArg = "";

	for (let i = 0; i < line.length; i += 1) {
		const currentToken = tokens[tokens.length - 1];
		const symbol = line[i];
		switch (symbol) {
			case "\"": {
				switch (currentToken) {
					case DOUBLE_QUOTE: {
						tokens.pop();
						break;
					}
					case ARG: {
						tokens.push(DOUBLE_QUOTE);
						break;
					}
					case ESCAPE: {
						tokens.pop();
						currentArg += symbol;
						break;
					}
					default: {
						currentArg += symbol;
						break;
					}
				}
				break;
			}
			case "'": {
				switch (currentToken) {
					case SINGLE_QUOTE: {
						tokens.pop();
						break;
					}
					case ARG: {
						tokens.push(SINGLE_QUOTE);
						break;
					}
					case ESCAPE: {
						tokens.pop();
						currentArg += symbol;
						break;
					}
					default: {
						currentArg += symbol;
						break;
					}
				}
				break;
			}
			case "\\": {
				switch (currentToken) {
					case ARG: {
						tokens.push(ESCAPE);
						break;
					}
					case ESCAPE: {
						tokens.pop();
						currentArg += symbol;
						break;
					}
					default: {
						currentArg += symbol;
						break;
					}
				}
				break;
			}
			case " ": {
				switch (currentToken) {
					case ARG: {
						if (currentArg.length !== 0) {
							args.push(currentArg);
							currentArg = "";
						}
						break;
					}
					case ESCAPE: {
						tokens.pop();
						currentArg += symbol;
						break;
					}
					default: {
						currentArg += symbol;
						break;
					}
				}

				break;
			}
			default: {
				switch (currentToken) {
					case ESCAPE: {
						tokens.pop();
						currentArg += symbol;
						break;
					}
					default: {
						currentArg += symbol;
						break;
					}
				}
			}
		}
	}
	if (currentArg.length !== 0) {
		args.push(currentArg);
	}
	return args;
};
