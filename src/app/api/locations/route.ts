import { NextRequest } from 'next/server';
import { normalizeLimit } from '@/entities/location/server/queries';
import { json } from '@/entities/location/server/response';
import {
  getCitiesResponse,
  getCountriesResponse,
} from '@/entities/location/server/service';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get('type');

  try {
    if (type === 'countries') {
      return json(await getCountriesResponse());
    }

    if (type === 'cities') {
      const countryCode = request.nextUrl.searchParams.get('countryCode');
      const query = request.nextUrl.searchParams.get('q') ?? '';
      const limit = normalizeLimit(request.nextUrl.searchParams.get('limit'));

      if (!countryCode) {
        return json({ error: 'countryCode query parameter is required' }, 400);
      }

      return json(await getCitiesResponse(countryCode, query, limit));
    }

    return json(
      { error: 'type query parameter must be countries or cities' },
      400,
    );
  } catch (error) {
    console.error('locations route error', error);

    return json({ error: 'Failed to load locations' }, 500);
  }
}
