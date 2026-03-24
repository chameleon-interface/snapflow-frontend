export type CountryDto = {
  code: string;
  name: string;
};

export type CityDto = {
  name: string;
};

export type LocationsResponse<T> = {
  data: T[];
};
