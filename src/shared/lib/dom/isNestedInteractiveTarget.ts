const INTERACTIVE_TARGET_SELECTOR =
  'button, a, input, textarea, select, [role="button"]';

export const isNestedInteractiveTarget = (
  target: EventTarget | null,
  currentTarget: EventTarget | null,
) => {
  return (
    target instanceof Element &&
    target.closest(INTERACTIVE_TARGET_SELECTOR) !== currentTarget
  );
};
