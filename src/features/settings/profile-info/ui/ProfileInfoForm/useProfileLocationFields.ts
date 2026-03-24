import { useMemo, useState } from 'react';
import { useCitiesByCountry } from '@/entities/location/api/useCitiesByCountry';
import { useCountries } from '@/entities/location/api/useCountries';
import {
  mapCitiesToSelectOptions,
  mapCountriesToSelectOptions,
} from '@/entities/location/model/mappers';

type SelectOption = {
  value: string;
  label: string;
};

const withSelectedValue = (options: SelectOption[], value: string) => {
  if (!value || options.some((option) => option.value === value)) {
    return options;
  }

  return [{ value, label: value }, ...options];
};

type UseProfileLocationFieldsParams = {
  country: string;
  city: string;
  isFormLoading: boolean;
  onCountryChange: (value: string) => void;
  onCityChange: (value: string) => void;
};

export const useProfileLocationFields = ({
  country,
  city,
  isFormLoading,
  onCountryChange,
  onCityChange,
}: UseProfileLocationFieldsParams) => {
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const { data: countries = [] } = useCountries();

  const countryCodeByName = useMemo(() => {
    return new Map(countries.map((item) => [item.name, item.code]));
  }, [countries]);

  const selectedCountryCode = useMemo(() => {
    if (!country) {
      return undefined;
    }

    return countryCodeByName.get(country);
  }, [countryCodeByName, country]);

  const { data: cities = [], isFetching: isCitiesFetching } =
    useCitiesByCountry({
      countryCode: selectedCountryCode,
      query: citySearchQuery,
    });

  const countryOptions = useMemo(() => {
    return withSelectedValue(mapCountriesToSelectOptions(countries), country);
  }, [countries, country]);

  const cityOptions = useMemo(() => {
    return withSelectedValue(mapCitiesToSelectOptions(cities), city);
  }, [cities, city]);

  const cityDisabled = !country || !selectedCountryCode || isFormLoading;

  const handleCountryChange = (value: string) => {
    setCitySearchQuery('');
    onCountryChange(value);
  };

  const handleCityChange = (value: string) => {
    setCitySearchQuery('');
    onCityChange(value);
  };

  return {
    cityOptions,
    countryOptions,
    cityDisabled,
    isCitiesFetching,
    setCitySearchQuery,
    handleCountryChange,
    handleCityChange,
  };
};
