export function generatePrefixClasses<T extends string>(
  classes: Record<T, string>,
  prefix?: string,
): Record<T, string> {
  const result: Record<string, string> = {};

  for (const name in classes) {
    result[name] = [prefix, classes[name]].filter((v) => !!v).join('-');
  }

  return result;
}
