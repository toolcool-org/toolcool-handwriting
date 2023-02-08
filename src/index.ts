import TCEncoder from './encoder';
import TCDecoder from './decoder';

declare global {
    interface Window {
        TCEncoder: typeof TCEncoder;
        TCDecoder: typeof TCDecoder;
    }
}

window.TCEncoder = TCEncoder;
window.TCDecoder = TCDecoder;