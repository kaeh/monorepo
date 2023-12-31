import { defaultLogLevel } from "../constants";
import { LogLevel } from "../models";

export const getPersistedLogLevel = (persistenceKey: string): LogLevel => Number(localStorage.getItem(persistenceKey) ?? defaultLogLevel) as LogLevel;
