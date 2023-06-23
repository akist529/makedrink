export default function getSlug (filename: string) {
    return `${filename.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-').replaceAll('ä', 'a')}`;
}