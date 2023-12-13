import { ValueOf } from '@models';

export interface IUploadClasses {
  root: string;
  disabled: string;
  isError: string;
  // 업로드 스타일
  button: string;
  area: string;
  drag: string;
  none: string;
}

export type TUploadClassKey = keyof IUploadClasses;

export const uploadClasses: IUploadClasses = {
  root: '',
  disabled: 'disabled',
  isError: 'error',
  // 업로드 스타일
  button: 'button',
  area: 'area',
  drag: 'drag',
  none: 'none',
};

export interface IUploadFileeStyle {
  jpg: string;
  jpeg: string;
  png: string;
  svg: string;
  image: string;
  video: string;
  audio: string;
  pdf: string;
  csv: string;
  // 97-2003 excel(.xls)
  xls: string;
  // 2003이후 excel파일
  xlsx: string;
  text: string;
  html: string;
  // 특정 타입의 모든 파일(for example, a WAV or PDF)
  filetype: string;
  // application타입
  application: string;
}

export type TUploadImageStyleClassKey = keyof IUploadFileeStyle;

export const uploadFileFormat = {
  jpg: 'image/jpg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  image: 'image/*',
  video: 'video/*',
  audio: 'audio/*',
  pdf: 'application/pdf',
  csv: 'text/csv',
  // 97-2003 excel(.xls)
  xls: '.xls',
  // 2003이후 excel파일
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  text: 'text/plain',
  html: 'text/html',
  // 특정 타입의 모든 파일(for example, a WAV or PDF)
  filetype: '.FILETYPE',
  // 모든 application type
  application: 'application/*',
} as const;

export type TUploadFileFormat = ValueOf<typeof uploadFileFormat>;
export type TFormatAll = Partial<TUploadFileFormat>;
