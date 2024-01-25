import { customClasses, ICustomClass } from '@styles/customClasses';
import classNames from 'classnames';

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

type ClassType = { [key: string]: ClassType | string | ICustomClass };

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
      if ('base' in (value as object)) {
        const base = [GLOBAL_PREFIX, prefix, value.base].filter((v) => !!v).join('-');
        result[item] = classNames(base, { [customClasses.rounded]: value.rounded });
      } else {
        result[item] = attachPrefixClasses(
          value as ClassType,
          isPrefixNested ? [prefix, item].join('-') : prefix,
          isPrefixNested,
        );
      }
    }
  }

  return result as T;
};
