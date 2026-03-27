export async function generateImage(prompt: string, aspectRatio: "1:1" | "16:9" | "9:16" = "16:9") {
  // AI generation disabled as per user request
  const seed = encodeURIComponent(prompt.substring(0, 20));
  const [width, height] = aspectRatio === '16:9' ? [1920, 1080] : aspectRatio === '9:16' ? [1080, 1920] : [1080, 1080];
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
