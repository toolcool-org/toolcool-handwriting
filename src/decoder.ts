
const decodeToken = (encoded: string, i: number, offset: number, length: number) => {
    let tokeValue = '';
    const startIndex = i - offset;

    if(offset < length){
        const char = encoded[startIndex];
        tokeValue += char.repeat(length);
    }
    else{
        const endIndex = Math.min(startIndex + length, encoded.length);
        for(let t=startIndex; t<endIndex; t++){
            tokeValue += encoded[t];
        }
    }

    return tokeValue;
};

const getNumber = (encoded: string, i: number) => {
    let result = '';
    let t = i;

    while(Number.isInteger(Number(encoded[t])) && t<encoded.length){
        result += encoded[t];
        t++;
    }
    return result;
};

const TCDecoder = (encoded: string) => {
    let decoded = '';

    const len = encoded.length;

    let i = 0;
    while(i < len){
        const char = encoded[i];

        if(char === '<'){
            const offset = getNumber(encoded, i + 1);
            let length = '';
            let isValid = offset.length > 0 && Number.isInteger(Number(offset));
            if(isValid){
                length = getNumber(encoded, i + offset.length + 2);
                isValid = length.length > 0 && Number.isInteger(Number(length));
            }

            if(!isValid){
                decoded += char;
                i++;
            }
            else{
                const tokenValue = decodeToken(encoded, i, Number(offset), Number(length));
                decoded += tokenValue;
                i += offset.length + length.length + 3;
            }
        }
        else{
            decoded += char;
            i++;
        }
    }

    return decoded;
};

export default TCDecoder;