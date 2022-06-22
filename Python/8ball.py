import random, sys

ANSI_COLOR_RESET = "\x1b[0m"
ANSI_COLOR_RED = "\x1b[31m"
ANSI_COLOR_GREEN = "\x1b[32m"
ANSI_COLOR_YELLOW = "\x1b[33m"
F_GOOD = 0
F_NEUTRAL = 1
F_BAD = 2

ResponsePool = [
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
]

ResponseFavorString = ['+', '-', 'X']

ResponseFavorColor = [ANSI_COLOR_GREEN, ANSI_COLOR_YELLOW, ANSI_COLOR_RED]

def Print_MagicResponse(isDebug):
    rand = random.randint(0, len(ResponsePool) - 1)
    favor = F_GOOD if (rand <= 9) else F_NEUTRAL if (rand > 9 and rand <= 14) else F_BAD
    print(f"{ResponseFavorColor[favor]}[{ResponseFavorString[favor]}]{ANSI_COLOR_RESET} {ResponsePool[rand]}")
    if isDebug is True:
        print("Success!")

def main():

    isDebug = False

    if len(sys.argv) > 0:
        if sys.argv[1] == "-v" or sys.argv[1] == "--verbose":
            isDebug = True
        else:
            isDebug = False

    while True:
        responseString = input("Ask me anything: ");
        responseString = responseString.lower()
        if isDebug is True:
            print(f"{responseString}")

        if len(responseString) > 0:
            if responseString == "exit()":
                print("Goodbye!")
                if isDebug is True:
                    print("Exiting...")
                break
            
            Print_MagicResponse(isDebug)

            responseString = input("Would you like to ask another question? (Y/N): ")
            if len(responseString) > 0:
                responseString = responseString.lower()
                if isDebug is True:
                    print(f"{responseString}")
            
            if responseString == "y" or responseString == "yes":
                continue
            elif responseString == "n" or responseString == "no":
                break
            elif responseString == "exit()":
                print("Goodbye!")
                if isDebug is True:
                    print("Exiting...")
                break
            else:
                print("I'm sorry. I didn't quite catch that.\n")
                if isDebug is True:
                    print("No input provided.")
                print("Please ask me a question!\n")
                continue
        else:
            print("I'm sorry. I didn't quite catch that.\n")
            if isDebug is True:
                print("No input provided.")
            print("Please ask me a question!\n")
            continue


if __name__ == "__main__":
    main()