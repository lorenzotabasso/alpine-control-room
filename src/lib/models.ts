export enum ContentType {
  IMG = 'img',
  IFRAME = 'iframe',
}

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Webcam {
  nation: string
  region: string
  subRegion?: string
  coordinates?: Coordinates
  resortGroup?: string
  resort: string
  label: string
  altitude?: string
  contentType: ContentType
  source?: string
  link: string
  thumbnailLink?: string
}
