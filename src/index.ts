import handwriting from './handwriting';

declare global {
    interface Window {
        handwriting: typeof handwriting;
    }
}

window.handwriting = handwriting;