import { beforeEach, describe, expect, it } from "vitest";
import { Logger } from "./logger";
import { LoggerConfiguration } from "./logger-configuration";
import { LogLevel } from "./models";

describe("Logger", () => {
	let logger: Logger;

	beforeEach(() => {
		logger = new Logger("LoggerTest");
	});

	it("should be created", () => {
		expect(logger).toBeTruthy();
	});

	const testCases: [LogLevel, LogLevel[], LogLevel[]][] = [
		[LogLevel.DEBUG, [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR], []],
		[LogLevel.INFO, [LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR], [LogLevel.DEBUG]],
		[LogLevel.WARN, [LogLevel.WARN, LogLevel.ERROR], [LogLevel.DEBUG, LogLevel.INFO]],
		[LogLevel.ERROR, [LogLevel.ERROR], [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN]],
	];

	for (const [logLevel, logLevelsToLog, logLevelsToNotLog] of testCases) {
		describe(`logLevel = ${LogLevel[logLevel]}`, () => {
			beforeEach(() => {
				LoggerConfiguration.setLogLevel(logLevel);
			});

			for (const logLevelToLog of logLevelsToLog) {
				it(`should log ${LogLevel[logLevelToLog]} messages`, () => {
					const fnName: keyof Console = logLevelToLog === LogLevel.INFO ? "log" : (LogLevel[logLevelToLog].toLowerCase() as keyof Console);

					const spy = vi.spyOn(console, fnName);
					// biome-ignore lint/suspicious/noExplicitAny: Special case for console
					(logger as any)[fnName]("test message");
					expect(spy).toHaveBeenCalled();
				});
			}

			for (const logLevelToNotLog of logLevelsToNotLog) {
				it(`should not log ${LogLevel[logLevelToNotLog]} messages`, () => {
					const fnName: keyof Console = logLevelToNotLog === LogLevel.INFO ? "log" : (LogLevel[logLevelToNotLog].toLowerCase() as keyof Console);

					const spy = vi.spyOn(console, fnName);
					// biome-ignore lint/suspicious/noExplicitAny: Special case for console
					(logger as any)[fnName]("test message");
					expect(spy).not.toHaveBeenCalled();
				});
			}
		});
	}
});
