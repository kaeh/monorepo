import { defaultLogLevel } from "./constants";
import { getPersistedLogLevel } from "./functions";

export const LoggerConfiguration = {
	persistenceKey: "logLevel",
	getLogLevel: () => getPersistedLogLevel(LoggerConfiguration.persistenceKey) ?? defaultLogLevel,
	setLogLevel: (newLogLevel: number) => localStorage.setItem(LoggerConfiguration.persistenceKey, newLogLevel.toString()),
};
