export type CountryResponseItem = {
  code: string;
  name: string;
};

export type CityResponseItem = {
  name: string;
};

export type LocationsResponse<T> = {
  data: T[];
};

export type NormalizedCity = {
  name: string;
  normalizedName: string;
};

export type CountryCitiesCacheEntry = {
  cities: NormalizedCity[];
  expiresAt: number;
};
