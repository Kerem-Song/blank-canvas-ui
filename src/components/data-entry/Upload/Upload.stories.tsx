import { IUploadProps, Upload } from '@components';
import IcImg2 from '@icons/ic_img.svg';
import IcImg from '@icons/ic_img.svg?react';
import { Meta, StoryObj } from '@storybook/react';

import { uploadFileFormat } from './uploadClasses';

const meta: Meta = {
  title: 'components/data-entry/Upload/Upload',
  component: Upload,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '파일 업로드 입력',
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export default meta;

type Story = StoryObj<IUploadProps>;

export const Default: Story = {
  render: (args) => {
    return <Upload {...args}></Upload>;
  },
  args: {
    htmlForId: 'id',
    fileFormat: ['image/png'],
    fileSize: 3 * 1024 * 1024,
    shape: 'button',
    prefixText: 'File Upload',
  },
};

export const ButtonUpload: Story = {
  render: (args) => {
    return <Upload {...args}></Upload>;
  },
  args: {
    htmlForId: 'id',
    fileFormat: ['image/png'],
    fileSize: 3 * 1024 * 1024,
    shape: 'button',
    prefixIcon: <IcImg />,
    prefixText: '파일 찾기',
    width: 10,
    filePath: 'image path',
    callback: () => {
      alert('파일 업로드 완료');
    },
    errCallback: () => {
      alert('파일 업로드 실패');
    },
    setValue: () => {},
  },
};

export const AreaUpload: Story = {
  render: (args) => {
    return <Upload {...args}></Upload>;
  },
  args: {
    htmlForId: 'id',
    fileFormat: ['image/jpeg', 'image/jpg', 'image/png'],
    fileSize: 3 * 1024 * 1024,
    shape: 'area',
    height: 10,
    suffixIcon: <IcImg />,
    suffixText: `파일 업로드`,
    filePath: 'image path',
    callback: () => {
      alert('파일 업로드 완료');
    },
    errCallback: () => {
      alert('파일 업로드 실패');
    },
    setValue: () => {},
  },
};

export const DragAndDropUpload: Story = {
  render: (args) => {
    return (
      <>
        <Upload {...args}></Upload>
      </>
    );
  },
  args: {
    htmlForId: 'id',
    fileFormat: [uploadFileFormat.image],
    fileSize: 3 * 1024 * 1024,
    shape: 'drag',
    height: 10,
    suffixIcon: <IcImg />,
    suffixText: `Drag and Drop`,
    filePath: 'image path',
    callback: () => {
      alert('파일 업로드 완료');
    },
    errCallback: () => {
      alert('파일 업로드 실패');
    },
    setValue: () => {},
    multiple: true,
  },
};
