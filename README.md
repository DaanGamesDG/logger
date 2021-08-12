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
import { Structure } from "@daangamesdg/logger";

Structure.extend(
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

/* index.ts */
import "absolute/path/to/CustomLogger";
import { Logger } from "@daangamesdg/logger";

const logger = new Logger({ name: "name", timestamp: true });
logger.test(); // logs "test"
```

_Note: the examples writting in TypeScript_

## Author

👤 **DaanGamesDG**

- Website: https://daangamesdg.wtf/
- Email: <daan@daangamesdg.wtf>
- Twitter: [@DaanGamesDG](https://twitter.com/DaanGamesDG)
- Github: [@DaanGamesDG](https://github.com/DaanGamesDG)

### Lisence

Project is licensed under the © [**MIT License**](/LICENSE)

---
