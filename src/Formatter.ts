import { LogData, LoggerLevel } from "./Logger";
import moment from "moment";
import { inspect } from "util";

// eslint was drunk
// eslint-disable-next-line no-shadow
export enum ColourCode {
	RESET = 0,

	BOLD,
	DIM,
	ITALIC,
	UNDERLINE,
	INVERSE = 7,
	HIDDEN,
	STRIKETHROUGH,

	BLACK = 30,
	RED,
	GREEN,
	YELLOW,
	BLUE,
	MAGENTA,
	CYAN,
	WHITE,
	GRAY = 90,

	BRIGHT_RED,
	BRIGHT_GREEN,
	BRIGHT_YELLOW,
	BRIGHT_BLUE,
	BRIGHT_MAGENTA,
	BRIGHT_CYAN,
	BRIGHT_WHITE,

	BG_BLACK = 40,
	BG_RED,
	BG_GREEN,
	BG_YELLOW,
	BG_BLUE,
	BG_MAGENTA,
	BG_CYAN,
	BG_WHITE,

	BG_BRIGHT_RED = 101,
	BG_BRIGHT_GREEN,
	BG_BRIGHT_YELLOW,
	BG_BRIGHT_BLUE,
	BG_BRIGHT_MAGENTA,
	BG_BRIGHT_CYAN,
	BG_BRIGHT_WHITE,
}

/** The Formatter used to get nice text to show up in the console */
export class Formatter {
	/** Formats the input
	 * @param {unkown[]} input
	 * @param {{ name: String, level: "INFO" | "WARN" | "ERROR" | "TRACE" | "SILLY" | "DEBUG" | "FATAL"; timestamp: Date | number | null; }} config
	 */
	public format(input: unknown[], config: LogData & { name: string }): string {
		let str = "";

		if (config.timestamp) str += this.formatDate(config.timestamp);
		str += ` ${this.formatLevel(config.level)} ${this.formatName(config.name)} ${this._format(
			input
		)}`;

		return str;
	}

	protected _format(input: unknown[]): string {
		let str = "";

		for (const data of input) {
			if (data instanceof Error) {
				str += ` ${this.formatError(data)}`;
				continue;
			}

			if (typeof data === "object") {
				str += JSON.stringify(data);
				continue;
			}

			if (Array.isArray(data)) {
				str += ` ${data.join(" ")}`;
				continue;
			}

			str += ` ${data}`;
		}

		return str.trim();
	}

	protected formatError(error: Error): string {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const anyError: any = error;
		const stack: string =
			typeof anyError?.[inspect.custom] === "function"
				? inspect(error, false, 0, false)
				: (error.stack as string);

		return stack;
	}

	protected formatDate(input: Date | number): string {
		const date = typeof input === "number" ? new Date(input) : input;
		const dateString = moment(date).format("HH:mm:ss DD-MM-YYYY");

		const prefix = `\u001b[${ColourCode.GRAY}m`;
		const suffix = `\u001b[${this.getDelimiter(ColourCode.GRAY)}m`;

		return `${prefix}${dateString}${suffix}`;
	}

	protected formatLevel(level: LoggerLevel): string {
		const colour = this.getColour(level);

		const prefix = `\u001b[${colour}m`;
		const suffix = `\u001b[${this.getDelimiter(colour)}m`;

		return `${prefix}${`[${level}]`.padEnd(7, " ")}${suffix}`;
	}

	protected formatName(name: string): string {
		const white = ColourCode.BRIGHT_WHITE;

		const prefix = `\u001b[${white}m`;
		const suffix = `\u001b[${this.getDelimiter(white)}m`;

		return `${prefix}» [${name}]:${suffix}`;
	}

	protected getDelimiter(colour: ColourCode): number {
		switch (colour) {
			case ColourCode.RESET:
				return 0;
			case ColourCode.BOLD:
			case ColourCode.DIM:
				return 22;
			case ColourCode.ITALIC:
				return 23;
			case ColourCode.UNDERLINE:
				return 24;
			case ColourCode.INVERSE:
				return 27;
			case ColourCode.HIDDEN:
				return 28;
			case ColourCode.STRIKETHROUGH:
				return 29;
			case ColourCode.BLACK:
			case ColourCode.RED:
			case ColourCode.GREEN:
			case ColourCode.YELLOW:
			case ColourCode.BLUE:
			case ColourCode.MAGENTA:
			case ColourCode.CYAN:
			case ColourCode.WHITE:
			case ColourCode.GRAY:
			case ColourCode.BRIGHT_RED:
			case ColourCode.BRIGHT_GREEN:
			case ColourCode.BRIGHT_YELLOW:
			case ColourCode.BRIGHT_BLUE:
			case ColourCode.BRIGHT_MAGENTA:
			case ColourCode.BRIGHT_CYAN:
			case ColourCode.BRIGHT_WHITE:
				return 39;
			case ColourCode.BG_BLACK:
			case ColourCode.BG_RED:
			case ColourCode.BG_GREEN:
			case ColourCode.BG_YELLOW:
			case ColourCode.BG_BLUE:
			case ColourCode.BG_MAGENTA:
			case ColourCode.BG_CYAN:
			case ColourCode.BG_WHITE:
			case ColourCode.BG_BRIGHT_RED:
			case ColourCode.BG_BRIGHT_GREEN:
			case ColourCode.BG_BRIGHT_YELLOW:
			case ColourCode.BG_BRIGHT_BLUE:
			case ColourCode.BG_BRIGHT_MAGENTA:
			case ColourCode.BG_BRIGHT_CYAN:
			case ColourCode.BG_BRIGHT_WHITE:
				return 49;
			default:
				throw new Error(`Cannot determine delimiter for colour: ${colour}`);
		}
	}

	protected getColour(level: LoggerLevel) {
		switch (level) {
			case "INFO":
				return ColourCode.BLUE;
			case "WARN":
				return ColourCode.YELLOW;
			case "ERROR":
				return ColourCode.RED;
			case "DEBUG":
				return ColourCode.CYAN;
			case "SILLY":
				return ColourCode.GREEN;
			case "TRACE":
				return ColourCode.MAGENTA;
			case "FATAL":
				return ColourCode.BRIGHT_RED;
			default:
				throw new Error(`Cannot determine colour for level: ${level}`);
		}
	}
}
