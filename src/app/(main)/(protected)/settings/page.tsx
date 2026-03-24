import { redirect } from 'next/navigation';
import {
  SettingsPage,
  buildSettingsUrl,
  DEFAULT_SETTINGS_PART,
  isSettingsPart,
} from '@/pages-layer/settings';

type Props = {
  searchParams: Promise<{ part?: string | string[] }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const part = typeof params.part === 'string' ? params.part : undefined;

  if (!part || !isSettingsPart(part)) {
    redirect(buildSettingsUrl(DEFAULT_SETTINGS_PART));
  }

  return <SettingsPage part={part} />;
}
