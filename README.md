<h1 align="center">@DaanGamesDG/logger</h1>

> A simple logger you can use to log stuff in the console

## Install

```sh
yarn add / npm install @DaanGamesDG/logger
```

## Usage

Basic Usage

```ts
import { Logger } from "@DaanGamesDG/logger";

const logger = new Logger({ name: "name", timestamp: boolean });
logger.info(...unknown[]);
```

Advanced

```ts
/* Customlogger.ts */
import { Structures } from "@DaanGamesDG/logger";

Structures.extend(
	"Logger",
	(Logger) =>
		class CustomLogger extends Logger {
			// do what ever you want here

			// example
			public test(): void {
				console.log("test");
			}
		}
);

// Required if you use TypeScript
declare module "@DaanGamesDG/logger" {
	class Logger {
		test(): void;
	}
}

/* index.ts */
import "absolute/path/to/CustomLogger";
import { Logger } from "@DaanGamesDG/logger";

const logger = new Logger({ name: "name", timestamp: boolean });
logger.test(); // logs "test"
```

## Author

👤 **DaanGamesDG**

- Website: https://daangamesdg.wtf/
- Email: <daan@daangamesdg.wtf>
- Twitter: [@DaanGamesDG](https://twitter.com/DaanGamesDG)
- Github: [@DaanGamesDG](https://github.com/DaanGamesDG)

### Lisence

Project is licensed under the © [**MIT License**](/LICENSE)

---
