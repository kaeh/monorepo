import { Observable, tap } from "rxjs";
import { LogFn } from "../models";

export type LogOperatorFn = <T>(...data: unknown[]) => (source$: Observable<T>) => Observable<T>;

export const logMessageOperator =
	<T>(logFn: LogFn) =>
	(...data: unknown[]) =>
	(source$: Observable<T>) =>
		source$.pipe(tap((datum: T) => logFn(...data, datum)));
