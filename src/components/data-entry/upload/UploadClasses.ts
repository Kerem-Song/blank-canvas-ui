import { ValueOf } from '@models';
import { attachPrefixClasses } from '@modules/utils/generatePrefixClasses/generatePrefixClasses';

const classes = {
  root: '',
  disabled: 'disabled',
  isError: 'error',
  // 업로드 스타일
  shape: {
    root: '',
    button: 'button',
    area: 'area',
    drag: 'drag',
  },
  button: 'button',
  area: 'area',
  drag: 'drag',
  prefix: { root: '', icon: 'icon', text: 'text' },
  suffix: { root: '', wrapper: 'wrapper', icon: 'icon', text: 'text' },
} as const;

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

export const uploadClasses = attachPrefixClasses(classes, 'upload', true);
