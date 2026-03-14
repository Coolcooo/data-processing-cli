import readline from "readline";
import {parseArgs} from "./parse-args";
import {executeCommand} from "./execute-command";

export const initReadline = async (config) => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	for await (const line of rl) {
		const args = parseArgs(line);
		await executeCommand(args, config);
	}
}