export type DeviceCategory = 'mobile' | 'desktop';

const MOBILE_SUBSTRINGS = [
  'mobile',
  'phone',
  'smartphone',
  'tablet',
  'iphone',
  'ipad',
  'ipod',
  'android',
  'kindle',
  'blackberry',
] as const;

export const getDeviceCategory = (
  deviceType: string | undefined,
): DeviceCategory => {
  if (deviceType == null || deviceType.trim() === '') {
    return 'desktop';
  }

  const normalized = deviceType.trim().toLowerCase();

  for (const fragment of MOBILE_SUBSTRINGS) {
    if (normalized.includes(fragment)) {
      return 'mobile';
    }
  }

  return 'desktop';
};
