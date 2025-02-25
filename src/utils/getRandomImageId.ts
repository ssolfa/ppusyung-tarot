import imageIds from '@/data/tarot-card-id.json';

export function getRandomImageId(): string {
  const ids = imageIds.imageIds;
  const randomIndex = Math.floor(Math.random() * ids.length);
  return ids[randomIndex];
}
