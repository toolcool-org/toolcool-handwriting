declare module 'toolcool-string-compress' {

    export const TCEncoder: (text: string) => string;

    global {
        interface Window {
            TCCompress: typeof TCEncoder;
        }
    }
}