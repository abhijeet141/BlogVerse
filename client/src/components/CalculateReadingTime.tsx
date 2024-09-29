export function CalculateReadingTime(content: string){
    const cleanContent = content.replace(/<[^>]*>/g, ' ').trim();
    const words = cleanContent.split(/\s+/);
    const wordCount = words.length;
    const readingTime = Math.ceil(wordCount / 200);
    return readingTime;
}