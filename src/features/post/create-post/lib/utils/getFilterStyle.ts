import { Filter } from 'cc-gram';

let instance: InstanceType<typeof Filter> | null = null;

const getInstance = (): InstanceType<typeof Filter> => {
  if (!instance) instance = new Filter({ init: false });
  return instance;
};

export const getFilterStyle = (filterId: string): string =>
  filterId === 'normal' ? 'none' : getInstance().getFilterStyle(filterId);
