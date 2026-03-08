// Navigation menu labels
export const MENU_LABELS = {
  WEBCAMS: 'Webcams',
  MAP: 'Map',
  REPORTS: 'Weather & Reports',
} as const;

// Map configuration
export const MAP_CONFIG = {
  DEFAULT_CENTER: [45.194, 7.427] as [number, number],
  DEFAULT_ZOOM: 8,
  MAX_ZOOM: 28,
  MIN_ZOOM: 7,
} as const;

// Image URLs
export const EXTERNAL_URLS = {
  AOSTA_VALLEY_REPORT: 'https://www.lovevda.it/en/before-your-trip/downhill-snow-report',
  PIEDMONT_REPORT: 'https://www.arpa.piemonte.it/temi/neve-ghiacciai/neve',
  AVALANCHE_BULLETIN: 'https://bollettini-en.aineva.it/bulletin/latest',
  METEO_FORECAST: 'https://www.meteo3r.it/app/public/',
} as const;

export const COUNTRY_FLAGS = {
  ITA: '🇮🇹',
  FRA: '🇫🇷',
} as const;

export const REPORTS = [
  {
    id: 'aosta-valley',
    title: 'Ground snow report - Aosta Valley (by VDA Region)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Flag_map_of_Aosta_Valley.svg',
    url: EXTERNAL_URLS.AOSTA_VALLEY_REPORT,
    borderColor: 'border-cyan-500',
    hoverColor: 'hover:bg-cyan-50',
  },
  {
    id: 'piedmont',
    title: 'Ground snow report - Piedmont (by ARPA)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_map_of_Piedmont.svg',
    url: EXTERNAL_URLS.PIEDMONT_REPORT,
    borderColor: 'border-cyan-500',
    hoverColor: 'hover:bg-cyan-50',
  },
  {
    id: 'avalanche',
    title: 'Avalanche bulletin (by AINEVA)',
    image: '/logo-aineva.png',
    url: EXTERNAL_URLS.AVALANCHE_BULLETIN,
    borderColor: 'border-red-500',
    hoverColor: 'hover:bg-red-50',
  },
  {
    id: 'meteo',
    title: 'Weather forecast and other data (by Meteo3R)',
    image: '/logo-meteo3R.png',
    url: EXTERNAL_URLS.METEO_FORECAST,
    borderColor: 'border-green-500',
    hoverColor: 'hover:bg-green-50',
  },
] as const;
