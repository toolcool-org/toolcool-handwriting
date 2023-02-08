const TCEncoder = (text: string) => {

    const searchBuffer: Map<number, number> = new Map();
    const result = [];

    const encoder = new TextEncoder();
    const view = encoder.encode(text); // Uint8Array
    const len = view.length;

    let i=0;
    while(i<len){
        const byte = view[i];

        if(searchBuffer.has(byte)){
            // The character is repeated ---> we can create the token.
            // Try to maximize how much text the token is referencing.
            let previousCharacterIndex = searchBuffer.get(byte) ?? 0;
            let currentCharacterIndex = i;
            const tokenOffset = i - previousCharacterIndex;

            const tokenValue = [];
            while(text[previousCharacterIndex] === text[currentCharacterIndex] && currentCharacterIndex < len){
                tokenValue.push(view[currentCharacterIndex]);
                previousCharacterIndex++;
                currentCharacterIndex++;
            }

            const token = `<${ tokenOffset },${ tokenValue.length }>`;
            if(tokenValue.length > token.length){
                // place the token
                const tokenUint8Array = encoder.encode(token);
                result.push(...tokenUint8Array);
            }
            else{
                // token size is bigger that the actual text --> place the text
                result.push(...tokenValue);
            }

            i += tokenValue.length;
        }
        else{
            // New non-repeated characters just added to the result as a plain text.
            searchBuffer.set(byte, i);
            result.push(byte)
            i++;
        }
    }

    return new TextDecoder().decode(new Uint8Array(result));
};

export default TCEncoder;