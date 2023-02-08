import handwriting from './handwriting';

describe('Encode', () => {
    test('a', async () => {
        const res = await handwriting();
        expect(res).toStrictEqual(1);
    });
});
