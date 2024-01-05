export interface CarouselClasses {
  root: string;
  opacity30: string;
  opacity50: string;
  opacity70: string;
  opacity100: string;
  btnSquare: string;
  btnCircle: string;
}

export type CarouselClasskey = keyof CarouselClasses;

export const carouselClasses: CarouselClasses = {
  root: '',
  opacity30: 'opacity-30',
  opacity50: 'opacity-50',
  opacity70: 'opacity-70',
  opacity100: 'opacity-100',
  btnSquare: 'btn-square',
  btnCircle: 'btn-circle',
};
