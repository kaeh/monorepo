import { LoggerConfiguration } from "../logger-configuration";
import { LogLevel } from "../models";

export const logMessage =
	(logTag: string, logLevel: LogLevel) =>
	(...data: unknown[]): void => {
		if (logLevel < LoggerConfiguration.getLogLevel()) {
			return;
		}

		let logFn: (...data: unknown[]) => void;
		if (logLevel === LogLevel.INFO) {
			logFn = console.log;
		} else {
			// biome-ignore lint/suspicious/noExplicitAny: Special case for console
			logFn = (console as any)[LogLevel[logLevel].toLowerCase()] ?? console.log;
		}

		data.unshift(`[${logTag}]`);

		logFn(...data);
	};
