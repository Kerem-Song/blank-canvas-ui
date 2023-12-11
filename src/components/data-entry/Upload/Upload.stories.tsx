import { IUploadProps, Upload } from '@components';
import IcImg from '@icons/ic_img.svg?react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'components/data-entry/Upload/Upload',
  component: Upload,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '파일 업로드 입력',
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
    fileFormat: ['image/png', 'image/jpg'],
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
  },
};

export const NoneDesignUpload: Story = {
  render: (args) => {
    return <Upload {...args} />;
  },
  args: {
    htmlForId: 'id',
    fileFormat: ['image/jpg', 'image/jpeg'],
    fileSize: 3 * 1024 * 1024,
    shape: 'none',
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
