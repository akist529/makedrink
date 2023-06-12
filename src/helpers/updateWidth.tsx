export default function updateWidth (e: HTMLImageElement) {
    e.width = (e.height / e.naturalHeight) * e.naturalWidth;
}