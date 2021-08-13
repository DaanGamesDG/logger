import type Formatter from "./Formatter";
import { Structure } from "./Structure";

/** The logger itself */
export default class Logger {
	/** The name of the logger */
	public readonly name: string;
	/** If the logger should log the timestamp or not */
	public readonly timestamp: boolean;
	public formatter: Formatter;

	/** Creates a new logger
	 * @param options
	 */
	public constructor(options: LoggerOptions) {
		this.name = options.name;
		this.timestamp = options.timestamp ?? true;

		this.formatter = new (Structure.get("Formatter"))();
	}

	/** Logs content to the console with log level "INFO"
	 * @param {unkown[]} input
	 */
	public info(...input: unknown[]): this {
		return this.write(input, { level: "INFO", timestamp: Date.now() });
	}

	/** Logs content to the console with log level "DEBUG"
	 * @param {unkown[]} input
	 */
	public debug(...input: unknown[]): this {
		return this.write(input, { level: "DEBUG", timestamp: Date.now() });
	}

	/** Logs content to the console with log level "ERROR"
	 * @param {unkown[]} input
	 */
	public error(...input: unknown[]): this {
		return this.write(input, { level: "ERROR", timestamp: Date.now() });
	}

	/** Logs content to the console with log level "FATAL"
	 * @param {unkown[]} input
	 */
	public fatal(...input: unknown[]): this {
		return this.write(input, { level: "FATAL", timestamp: Date.now() });
	}

	/** Logs content to the console with log level "WARN"
	 * @param {unkown[]} input
	 */
	public warn(...input: unknown[]): this {
		return this.write(input, { level: "WARN", timestamp: Date.now() });
	}

	/** Logs content to the console with log level "TRACE"
	 * @param {unkown[]} input
	 */
	public trace(...input: unknown[]): this {
		return this.write(input, { level: "TRACE", timestamp: Date.now() });
	}

	/** Logs content to the console with log level "SILLY"
	 * @param {unkown[]} input
	 */
	public silly(...input: unknown[]): this {
		return this.write(input, { level: "SILLY", timestamp: Date.now() });
	}

	public write(input: unknown[], data: LogData): this {
		const options = {
			timestamp: this.timestamp ? data.timestamp : null,
			level: data.level,
			name: this.name,
		};

		const formatted = this.formatter.format(input, options);
		console.log(formatted);

		return this;
	}
}

export interface LoggerOptions {
	name: string;
	timestamp?: boolean;
}

export interface LogData {
	level: LoggerLevel;
	timestamp: Date | number | null;
}

export type LoggerLevel = "INFO" | "WARN" | "ERROR" | "TRACE" | "SILLY" | "DEBUG" | "FATAL";
