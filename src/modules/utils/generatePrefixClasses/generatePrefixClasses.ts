export default function generatePrefixClasses<T extends string>(
  classes: Record<T, string>,
  prefix = '',
): Record<T, string> {
  const result: Record<string, string> = {};

  for (const name in classes) {
    result[name] = `${prefix}-${classes[name]}`;
  }

  return result;
}
