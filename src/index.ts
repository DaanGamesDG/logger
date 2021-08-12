import { Structure } from "./Structure";

export { LogData, LoggerLevel, LoggerOptions } from "./Logger";
export { default as Formatter, ColourCode } from "./Formatter";

const Logger = Structure.get("Logger");
export { Logger, Structure };
