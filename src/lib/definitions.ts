export enum ContentType {
  IMG = "img",
  IFRAME = "iframe",
}

export interface WebcamProps {
  nation: string;
  region: string;
  subRegion?: string;
  coordinates?: Coordinates;
  resortGroup?: string;
  resort: string;
  label: string;
  altitude?: string;
  contentType: ContentType;
  source?: string;
  link: string;
  thumbnailLink?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
