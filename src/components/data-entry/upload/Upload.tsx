import { DragEvent, forwardRef, useRef, useState } from 'react';
import { Button } from '@components/general/button/Button';
import icDelete from '@icons/ic_search_delete.svg';
import classNames from 'classnames';

import { IUploadProps } from './Upload.types';
import {
  TFormatAll,
  TUploadFileFormat,
  uploadClasses,
  uploadFileFormat,
} from './UploadClasses';

const formatAll: TFormatAll[] = [
  uploadFileFormat.image,
  uploadFileFormat.video,
  uploadFileFormat.audio,
  uploadFileFormat.application,
];

export const Upload = forwardRef<HTMLInputElement, IUploadProps>((args, ref) => {
  const [files, setFiles] = useState<File[]>();
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const {
    children,
    className,
    htmlForId,
    filePath,
    fileSize,
    fileFormat,
    prefixIcon,
    prefixText,
    suffixIcon,
    suffixText,
    width,
    height = 2,
    multiple = false,
    usePreview = false,
    callback,
    errCallback,
    setValue,
    onChange,
    ...uploadProps
  } = args;
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const FILE_SIZE = fileSize;
  const SUPPORTED_FORMATS = fileFormat;

  const rootClassName = classNames(
    uploadClasses.root,
    {
      // disabled
      [uploadClasses.disabled]: args.disabled,

      // error
      [uploadClasses.isError]: args.isError,

      // shape
      [uploadClasses.shape.button]: args.shape === 'button',
      [uploadClasses.shape.area]: args.shape === 'area',
      [uploadClasses.shape.drag]: args.shape === 'drag',
    },
    className,
  );

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (!SUPPORTED_FORMATS.includes(e.target.files[0]?.type as TUploadFileFormat)) {
        console.log('@e target 1', e.target.files[0]?.type);

        alert('파일 확장자를 확인 부탁드립니다.');
        // return;
      } else if (e.target.files[0].size > FILE_SIZE) {
        console.log('@e target failed');
        e.target.files = null;
        e.target.value = '';
        alert(`파일 크기는 ${fileSize}를 초과할 수 없습니다.`);

        return;
      }
      console.log('@e target', e.target.files);

      const targetFiles = Array.from(e.target.files);
      setFiles(targetFiles);

      // Use FileReader to read file content
      targetFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          callback();
          setValue(filePath, e.target.files, { shouldDirty: true });
        };

        reader.onerror = () => errCallback();

        reader.readAsDataURL(file);

        return reader;
      });
    }
    return;
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files) {
      if (
        !fileFormat.some((item) => formatAll.includes(item)) &&
        !SUPPORTED_FORMATS.includes(e.dataTransfer.files[0]?.type as TUploadFileFormat)
      ) {
        console.log('@e target 1', e.dataTransfer.files[0]?.type);

        alert('파일 확장자를 확인 부탁드립니다.');
        errCallback();
        return;
      } else if (e.dataTransfer.files[0].size > FILE_SIZE) {
        console.log('@e target failed');
        alert(`파일 크기는 ${fileSize}를 초과할 수 없습니다.`);
        // e.dataTransfer.files = null;
        // e.dataTransfer.value = '';
        errCallback();

        return;
      }
    }
    const droppedFiles = Array.from(e.dataTransfer.files);

    setFiles(droppedFiles);

    droppedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        callback();
        setValue(filePath, e.dataTransfer.files, { shouldDirty: true });
        setImageUrl([URL.createObjectURL(file)]);
      };

      reader.onerror = () => errCallback();

      reader.readAsDataURL(file);

      return reader;
    });
  };

  const handleDeleteFile = (name: string, lastModified: number) => {
    if (files) {
      setFiles(
        files.filter((item) => item.name !== name && item.lastModified !== lastModified),
      );
      setImageUrl([]);
    }
  };

  const acceptFormat = fileFormat.toString();

  return (
    <>
      <label
        className={rootClassName}
        htmlFor={htmlForId}
        style={{ height: `${height}rem`, width: `${width}rem` }}
        onDragOver={args.shape === 'drag' ? handleDragOver : undefined}
        onDragLeave={args.shape === 'drag' ? handleDragLeave : undefined}
        onDrop={args.shape === 'drag' ? handleDrop : undefined}
      >
        <span className={uploadClasses.prefix.icon}>
          {args.shape === 'button' ? prefixIcon : null}
        </span>
        <span className={uploadClasses.prefix.text}>
          {args.shape === 'button' ? prefixText : null}
        </span>
        <input
          type="file"
          id={htmlForId}
          accept={acceptFormat}
          onChange={onChange ?? handleChangeFile}
          style={{ display: 'none' }}
          autoComplete="off"
          multiple={multiple}
          {...uploadProps}
        />
        <div className={uploadClasses.suffix.wrapper}>
          <p className={uploadClasses.suffix.icon}>
            {args.shape !== 'button' ? suffixIcon : null}
          </p>
          <p className={uploadClasses.suffix.text}>
            {args.shape !== 'button' ? suffixText : null}
          </p>
        </div>
      </label>
      {usePreview && files
        ? files?.map((file) => (
            <div
              className="flex items-center justify-between rounded-[var(--bc-rounded)] hover:bg-gray-100"
              key={file.name + '-' + file.lastModified}
            >
              <div>
                <p>{file.name}</p>
              </div>
              <Button
                variant="text"
                onClick={() => handleDeleteFile(file.name, file.lastModified)}
              >
                <img src={icDelete} alt="expand-icon" />
              </Button>
            </div>
          ))
        : null}
      {usePreview
        ? imageUrl?.map((image, i) => <img src={image} alt="uploadImage" key={i} />)
        : null}
    </>
  );
});
