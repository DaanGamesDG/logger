<h1 align="center">@daangamesdg/logger</h1>

> A simple logger you can use to log stuff in the console

## Install

```sh
yarn add / npm install @daangamesdg/logger
```

## Usage

Basic Usage

```ts
import { Logger } from "@daangamesdg/logger";

const logger = new Logger({ name: "name", timestamp: true }); // options: { name: string; timestamp?: boolean (default = true) }
logger.info(anything, you, like);
```

Advanced

```ts
/* Customlogger.ts */
import { Structures } from "@daangamesdg/logger";

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
declare module "@daangamesdg/logger" {
	class Logger {
		test(): void;
	}
}

/* index.ts */
import "absolute/path/to/CustomLogger";
import { Logger } from "@daangamesdg/logger";

const logger = new Logger({ name: "name", timestamp: true });
logger.test(); // logs "test"
```

*Note: the examples writting in TypeScript*

## Author

👤 **DaanGamesDG**

- Website: https://daangamesdg.wtf/
- Email: <daan@daangamesdg.wtf>
- Twitter: [@DaanGamesDG](https://twitter.com/DaanGamesDG)
- Github: [@DaanGamesDG](https://github.com/DaanGamesDG)

### Lisence

Project is licensed under the © [**MIT License**](/LICENSE)

---
