import TCEncoder from './encoder';
import TCDecoder from './decoder';

describe('Encode', () => {
    test('a', () => {
        expect(TCEncoder(`a`)).toStrictEqual(`a`);
    });

    test('aa', () => {
        expect(TCEncoder(`aa`)).toStrictEqual(`aa`);
    });

    test('aaaaaa', () => {
        expect(TCEncoder(`aaaaaa`)).toStrictEqual(`aaaaaa`);
    });

    test('aaaaaaaaaa', () => {
        expect(TCEncoder(`aaaaaaaaaa`)).toStrictEqual(`a<1,9>`);
    });

    test('abbbbbbbcabbbbbbb', () => {
        expect(TCEncoder(`abbbbbbbcabbbbbbb`)).toStrictEqual(`ab<1,6>c<9,8>`);
    });

    test('I AM SAM.', () => {
        expect(TCEncoder(`I AM SAM.`)).toStrictEqual(`I AM SAM.`);
    });

    test('I AM SAM. I AM SAM', () => {
        expect(TCEncoder(`I AM SAM. I AM SAM. `)).toStrictEqual(`I AM SAM. <10,10>`);
    });

    test('I AM SAM. I AM SAM. SAM I AM.', () => {
        expect(TCEncoder(`I AM SAM. I AM SAM. SAM I AM.`)).toStrictEqual(`I AM SAM. <10,10>SAM I AM.`);
    });

    test(`I AM SAM.
I AM SAM.`, () => {
        expect(TCEncoder(`I AM SAM.
I AM SAM.`)).toStrictEqual(`I AM SAM.
<10,9>`);
    });

    test(`I AM SAM. I AM SAM. SAM I AM.
THAT SAM-I-AM! THAT SAM-I-AM!`, () => {
        expect(TCEncoder(`I AM SAM. I AM SAM. SAM I AM.
THAT SAM-I-AM! THAT SAM-I-AM!`)).toStrictEqual(`I AM SAM. <10,10>SAM I AM.
THAT SAM-I-AM! <15,14>`);
    });
});

describe('Decode', () => {
    test('a', () => {
        expect(TCDecoder(`a`)).toStrictEqual(`a`);
    });

    test('aa', () => {
        expect(TCDecoder(`aa`)).toStrictEqual(`aa`);
    });

    test('aaaaaa', () => {
        expect(TCDecoder(`aaaaaa`)).toStrictEqual(`aaaaaa`);
    });


    test('a<1,9>', () => {
        expect(TCDecoder(`a<1,9>`)).toStrictEqual(`aaaaaaaaaa`);
    });

    test('abbbbbbbcabbbbbbb', () => {
        expect(TCDecoder(`ab<1,6>c<9,8>`)).toStrictEqual(`abbbbbbbcabbbbbbb`);
    });

    test('I AM SAM.', () => {
        expect(TCDecoder(`I AM SAM.`)).toStrictEqual(`I AM SAM.`);
    });

    test('I AM SAM. <10,10>', () => {
        expect(TCDecoder(`I AM SAM. <10,10>`)).toStrictEqual(`I AM SAM. I AM SAM. `);
    });

    test('I AM SAM. <10,10>SAM I AM', () => {
        expect(TCDecoder(`I AM SAM. <10,10>SAM I AM.`)).toStrictEqual(`I AM SAM. I AM SAM. SAM I AM.`);
    });

    test(`I AM SAM.
<10,9>`, () => {
        expect(TCDecoder(`I AM SAM.
<10,9>`)).toStrictEqual(`I AM SAM.
I AM SAM.`);
    });

    test(`I AM SAM. <10,10>SAM I AM.
THAT SAM-I-AM! <15,14>`, () => {
        expect(TCDecoder(`I AM SAM. <10,10>SAM I AM.
THAT SAM-I-AM! <15,14>`)).toStrictEqual(`I AM SAM. I AM SAM. SAM I AM.
THAT SAM-I-AM! THAT SAM-I-AM!`);
    });
});

describe('Encoder - Decoder Connection', () => {

});

/*
   test('Long "I AM SAM..." text', () => {
        expect(TCEncoder(`I AM SAM. I AM SAM. SAM I AM.
THAT SAM-I-AM! THAT SAM-I-AM! I DO NOT LIKE THAT SAM-I-AM!
DO WOULD YOU LIKE GREEN EGGS AND HAM?
I DO NOT LIKE THEM,SAM-I-AM.
I DO NOT LIKE GREEN EGGS AND HAM.`)).toStrictEqual(`I AM SAM. <10,10>SAM I AM.
THAT SAM-I-AM! T<15,14>I DO NOT LIKE<29,15>
DO WOULD YOU LIKE GREEN EGGS AND HAM?
I<69,15>EM,<113,8>.<29,15>GR<64,16>.`);
    });
 */