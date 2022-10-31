class CharacterInsertion extends Modifier {
    private CharacterInsertRange: Char[];
    private Probability: number;

    constructor(InputCommand: Token[], IgnoreTokens: number[], Probability: string, Characters: string) {
        super(InputCommand, IgnoreTokens);

        this.Probability = Modifier.ParseProbability(Probability);

        // Parse character ranges
        if (Characters == null || Characters.length == 0)
            throw Error(`Missing CharacterRange`);

        this.CharacterInsertRange = Characters.split('').map(x => x as String as Char);
    }

    GenerateOutput(): Token[] {
        let result: Token[] = [];
        var This = this;
        this.InputCommandTokens.forEach(function (chars) {
            var Token: Token = [] as Char[] as Token;
            chars.forEach(char => {
                // Add current char to result string
                Token.push(char);

                // Ensure (a) char is not read-only
                //        (b) probability tells us we will insert a char from the range
                var i = 0;
                if (!chars.ReadOnly && This.CoinFlip(This.Probability))
                    do {
                        Token.push(Modifier.ChooseRandom(This.CharacterInsertRange));
                        i++;
                    } while (This.CoinFlip(This.Probability * (0.9 ** i)));
            });
            result.push(Token);
        });
        return result;
    }
}
