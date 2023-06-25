export default function getSlug (filename: string) {
    if (!filename) return;

    return `${filename.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-').replaceAll('ä', 'a')}`;
}