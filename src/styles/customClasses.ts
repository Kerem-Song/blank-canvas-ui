import classNames from 'classnames';

export interface ICustomClass {
  base: string;
  rounded?: boolean;
}

export type CustomClassType = string & {
  rounded: () => string;
};

Object.defineProperty(String.prototype, 'rounded', {
  value() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return classNames(this, customClasses.rounded);
  },
});

export const customClasses = {
  rounded: 'custom-rounded',
};
