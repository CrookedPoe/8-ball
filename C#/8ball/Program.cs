string[] ResponsePool = {
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
};

char[] ResponseFavorString = {
    '+', '-', 'X'
};

ConsoleColor[] ResponseFavorColor =
{
    ConsoleColor.Green,
    ConsoleColor.Yellow,
    ConsoleColor.Red
};

void Print_MagicResponse() {

    int F_GOOD = 0;
    int F_NEUTRAL = 1;
    int F_BAD = 2;

    Random _rand = new Random();
    int rand = _rand.Next(0, ResponsePool.Length);

    /* Calculate Favor */
    int favor = (rand <= 9) ? F_GOOD : (rand > 9 && rand <= 14) ? F_NEUTRAL : F_BAD;

    /* Print Response */
    Console.ForegroundColor = ResponseFavorColor[favor];
    Console.Write($"[{ResponseFavorString[favor]}]");
    Console.ForegroundColor = ConsoleColor.White;
    Console.Write($" {ResponsePool[rand]}\n");
    if (isDebug)
    {
        Console.WriteLine("Success!");
    }
}

bool isDebug = false;

if (args.Count() > 0) {
    isDebug = (args[0] == "-v" || args[0] == "--verbose") ? true : false;
} else {
    isDebug = false;
}

while(true)
{
    Console.Write("Ask me anything: ");
    string? responseString = Console.ReadLine();

    if (responseString != String.Empty || responseString != null) 
    {
        responseString = responseString?.ToLower();
        if (isDebug)
        {
            Console.WriteLine($"{responseString}");
        }

        if (responseString == "exit()")
        {
            Console.WriteLine("Goodbye!");
            if (isDebug)
            {
                Console.WriteLine("Exiting...");
            }
            break;
        }

        Print_MagicResponse();

        Console.Write("Would you like to ask me something else? (Y/N): ");
        responseString = Console.ReadLine();

        if (responseString != String.Empty || responseString != null)
        {
            responseString = responseString?.ToLower();
            if (isDebug)
            {
                Console.WriteLine($"{responseString}");
            }
        }

        if (responseString == "y" || responseString == "yes")
        {
            continue;
        }
        else if (responseString == "n" || responseString == "no")
        {
            break;
        }
        else if (responseString == "exit()")
        {
            Console.WriteLine("Goodbye!");
            if (isDebug)
            {
                Console.WriteLine("Exiting...");
            }
            break;
        }
        else
        {
            Console.WriteLine("I'm sorry. I didn't quite catch that.");
            if (isDebug)
            {
                Console.WriteLine("No input provided.");
            }
            Console.WriteLine("Please ask me a question!");
        }
    }
    else
    {
            Console.WriteLine("I'm sorry. I didn't quite catch that.");
            if (isDebug)
            {
                Console.WriteLine("No input provided.");
            }
            Console.WriteLine("Please ask me a question!");
    }
}


