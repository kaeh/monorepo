import { LogOperatorFn, logMessage, logMessageOperator } from "./functions";
import { LogFn, LogLevel } from "./models";

export class Logger {
	public readonly debug: LogFn = logMessage(this.uniqTag, LogLevel.DEBUG);
	public readonly log: LogFn = logMessage(this.uniqTag, LogLevel.INFO);
	public readonly warn: LogFn = logMessage(this.uniqTag, LogLevel.WARN);
	public readonly error: LogFn = logMessage(this.uniqTag, LogLevel.ERROR);

	public readonly debugOperator: LogOperatorFn = logMessageOperator(this.debug);
	public readonly logOperator: LogOperatorFn = logMessageOperator(this.log);
	public readonly warnOperator: LogOperatorFn = logMessageOperator(this.warn);
	public readonly errorOperator: LogOperatorFn = logMessageOperator(this.error);

	public constructor(private readonly uniqTag: string) {
		// Trim uniqTag and replace starting and trailing brackets
		this.uniqTag = this.uniqTag.trim().replace(/(^\[|\]$)/g, "");

		if (!this.uniqTag) {
			throw new Error("uniqTag was nullish or blank but is required");
		}
	}
}
