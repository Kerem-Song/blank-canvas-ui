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

const GLOBAL_PREFIX = 'bc';

type ClassType = { [key: string]: ClassType | string };

export const attachPrefixClasses = <T extends ClassType = ClassType>(
  classes: T,
  prefix?: string,
  isPrefixNested: boolean = true,
): T => {
  const result: ClassType = {};

  for (const item in classes) {
    const value = classes[item];
    if (typeof value === 'string') {
      result[item] = [GLOBAL_PREFIX, prefix, value].filter((v) => !!v).join('-');
    } else {
      result[item] = attachPrefixClasses(
        value,
        isPrefixNested ? [prefix, item].join('-') : prefix,
        isPrefixNested,
      );
    }
  }

  return result as T;
};
