import { type Webcam, ContentType } from './models';
import { COUNTRY_FLAGS } from './constants';

export function getImageUrl(webcam: Webcam): string | undefined {
  if (webcam.contentType === ContentType.IMG) {
    return webcam.link;
  }
  return webcam.thumbnailLink;
}

export function getFlagEmoji(nation: string): string {
  const flag = COUNTRY_FLAGS[nation as keyof typeof COUNTRY_FLAGS];
  return flag || nation;
}

export function formatLocationInfo(
  nation: string,
  region: string,
  subRegion?: string
): string {
  const parts = [getFlagEmoji(nation), region];
  if (subRegion) {
    parts.push(`- ${subRegion}`);
  }
  return parts.join(' ');
}

export function filterWebcams(
  webcams: Webcam[],
  searchTerm: string
): Webcam[] {
  const search = searchTerm.toLowerCase();
  return webcams.filter((webcam) =>
    [
      webcam.resort,
      webcam.nation,
      webcam.region,
      webcam.subRegion,
    ].some((field) => field?.toLowerCase().includes(search))
  );
}

export function openUrl(url: string, target: '_blank' | '_self' = '_blank'): void {
  window.open(url, target);
}
