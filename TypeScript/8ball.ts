import * as readline from 'readline';

let ANSI_COLOR_RESET = "\x1b[0m";
let ANSI_COLOR_RED = "\x1b[31m";
let ANSI_COLOR_GREEN = "\x1b[32m";
let ANSI_COLOR_YELLOW = "\x1b[33m";
let F_GOOD = 0;
let F_NEUTRAL = 1;
let F_BAD = 2;

let ResponsePool: string[] = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes--definitely!",
    "You may rely on it.",
    "As I see it yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy; try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful."
];

let ResponseFavorString: string[] = ['+', '-', 'X'];

let ResponseFavorColor: string[] = [ANSI_COLOR_GREEN, ANSI_COLOR_YELLOW, ANSI_COLOR_RED];

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function Print_MagicResponse(isDebug: boolean) {
    let rand: number = Math.floor(Math.random() * ResponsePool.length);
    let favor: number = (rand <= 9) ? F_GOOD : (rand > 9 && rand <= 14) ? F_NEUTRAL : F_BAD;

    console.log(`${ResponseFavorColor[favor]}[${ResponseFavorString[favor]}]${ANSI_COLOR_RESET} ${ResponsePool[rand]}`);
    if (isDebug == true) {
        console.log("Success!");
    }
}

function Update_Main() {

    let isDebug: boolean = false;
    if (process.argv.length > 2) {
        if (process.argv[2] == "-v" || process.argv[2] == "--verbose") {
            isDebug = true;
        }
    } else {
        isDebug = false;
    }

    rl.question("Ask me anything: ", (_responseString: string) => {
        let responseString = _responseString.toLowerCase();

        if (responseString != "") {
            if (isDebug == true) {
                console.log(responseString);
            }
            if (responseString == "exit()") {
                console.log("Goodbye!");
                if (isDebug == true) {
                    console.log("Exiting...");
                }
                rl.close();
                process.exit();
            }

            Print_MagicResponse(isDebug);

            rl.question("Would you like to ask me somehting else? (Y/N): ", (_responseString: string) => {
                let responseString = _responseString.toLowerCase();
                if (isDebug == true) {
                    console.log(responseString);
                }
                if (responseString == "y" || responseString == "yes") {
                    setImmediate(Update_Main);
                } else if (responseString == "n" || responseString == "no") {
                    rl.close();
                } else if (responseString == "exit()") {
                    console.log("Goodbye!");
                    if (isDebug == true) {
                        console.log("Exiting...");
                    }
                    rl.close();
                    process.exit();
                } else {
                    console.log("I'm sorry. I didn't quite catch that.");
                    if (isDebug == true) {
                        console.log("No input provided.");
                    }
                    console.log("Please ask me a question!");
                    setImmediate(Update_Main);
                }
            });
        } else {
            console.log("I'm sorry. I didn't quite catch that.");
            if (isDebug == true) {
                console.log("No input provided.");
            }
            console.log("Please ask me a question!");
            setImmediate(Update_Main);
        }
    });
}

Update_Main();