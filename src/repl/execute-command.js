const getCommand = (args) => {
	return args[0];
};

const getArguments = (args) => {
	const commandArgs = [];
	for (let i = 1; i < args.length; i += 1) {
		const commandArg = args[i];
		if (commandArg.startsWith("--")) {
			break;
		}
		commandArgs.push(commandArg);
	}
	return commandArgs;
};

const getOptions = (args) => {
	const options = {};
	let currentOption = null;
	for (let i = 1; i < args.length; i += 1) {
		const option = args[i];
		if (option.startsWith("--")) {
			currentOption = option.slice(2);
			options[currentOption] = [];
		} else if (currentOption !== null) {
			options[currentOption].push(option);
		}

	}
	return options;
}

export const executeCommand = async (args, config) => {
	const argCommand = getCommand(args);
	const commandArgs = getArguments(args);
	const commandOptions = getOptions(args);

	const configCommand = config[argCommand];
	if (!configCommand) {
		if (config.errorInput) {
			config.errorInput.handler();
		}
		return;
	}
	const parseArguments = {};
	const configArguments = configCommand.arguments;
	if (configArguments) {
		for (let i = 0; i < configArguments.length; i += 1) {
			const configArgument = configArguments[i];
			const commandArg = commandArgs[i];
			if (configArgument.required && commandArg === undefined) {
				if (config.errorInput) {
					config.errorInput.handler();
				}
				return;
			}
			parseArguments[configArgument.name] = parseValueWithType(commandArg, configArgument.type);
		}
	}

	const parseOptions = {};
	const configOptions = configCommand.options;
	if (configOptions) {
		const requiredConfigOptions = configOptions.required;
		if (requiredConfigOptions) {
			for (const optionName in requiredConfigOptions) {
				const configOption = requiredConfigOptions[optionName];
				const commandOption = commandOptions[optionName];
				if (configOption.required && commandOption === undefined) {
					if (config.errorInput) {
						config.errorInput.handler();
					}
					return;
				}
				parseOptions[optionName] = parseValueWithType(commandOption, configOption.type);
			}
		}
		const optionalConfigOptions = configOptions.optional;
		if (optionalConfigOptions) {
			for (const optionName in optionalConfigOptions) {
				const configOption = optionalConfigOptions[optionName];
				parseOptions[optionName] = parseValueWithType(commandOptions[optionName], configOption.type);
			}
		}
	}

	return configCommand.handler({arguments: parseArguments, options: parseOptions});
};

const parseValueWithType = (value, type = String) => {
	return type(value);
}