import type { CityDto, CountryDto } from '../api/types';

type SelectOption = {
  value: string;
  label: string;
};

export const mapCountriesToSelectOptions = (
  countries: CountryDto[],
): SelectOption[] => {
  return countries.map((country) => ({
    value: country.name,
    label: country.name,
  }));
};

export const mapCitiesToSelectOptions = (cities: CityDto[]): SelectOption[] => {
  return cities.map((city) => ({
    value: city.name,
    label: city.name,
  }));
};
