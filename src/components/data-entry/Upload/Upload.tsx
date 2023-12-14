import { Button } from '@components';
import icDelete from '@icons/ic_search_delete.svg';
import { generatePrefixClasses } from '@modules/utils';
import classNames from 'classnames';
import {
  DragEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useRef,
  useState,
} from 'react';

import {
  TFormatAll,
  TUploadFileFormat,
  uploadClasses,
  uploadFileFormat,
} from './uploadClasses';

const formatAll: TFormatAll[] = [
  uploadFileFormat.image,
  uploadFileFormat.video,
  uploadFileFormat.audio,
  uploadFileFormat.application,
];
export interface IUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 업로드 에러일 때 디자인하기 위한 boolean 값
   */
  isError?: boolean;

  /**
   * 업로드 입력의 모양
   */
  shape: 'button' | 'area' | 'drag' | 'none';

  /**
   * 업로드 input에 할당할 id
   */
  htmlForId: string;

  /**
   * 파일이 등록될 경로(react-hook-form)
   */
  filePath: string;

  /**
   * 파일 사이즈 제한
   */
  fileSize: number;

  /**
   * 파일 형식 제한
   * @type "image/jpg" | "image/jpeg" | "image/png" | "image/svg" | "image/*" | "video/*" | "audio/*" | ".pdf" | ".csv" | ".xls" | ".xlsx" | ".text/plain" | ".text/html" | ".FILETYPE"
   */
  fileFormat: TUploadFileFormat[];

  /**
   *  버튼 형식일 때 들어가는 prefix 텍스트
   */
  prefixText?: ReactNode;

  /**
   * 버튼 형식일때 첨부할 아이콘
   */
  prefixIcon?: ReactNode;

  /**
   * 버튼 형식이 아닐 때 들어가는 suffix 텍스트
   */
  suffixText?: ReactNode;

  /**
   * 버튼 형식이 아닐 때 들어가는 suffix 텍스트
   */
  suffixIcon?: ReactNode;

  /**
   * 업로더의 넓이;
   */
  width?: number;

  /**
   * 업로더의 높이(rem)
   */
  height?: number;

  /**
   * 업로드 이후 실행시킬 콜백(ex.성공 alert)
   */
  callback: () => void;

  /**
   * 업로드 실패 시 실행시킬 콜백(ex.실패 alert)
   */
  errCallback: () => void;

  /**
   * 업로드 이후에 해당 값에 업르드된 결과를 세팅하는 함수
   */
  setValue: (
    name: string,
    value: any,
    options?:
      | Partial<{
          shouldValidate: boolean;
          shouldDirty: boolean;
          shouldTouch: boolean;
        }>
      | undefined,
  ) => void;
}

export const Upload = forwardRef<HTMLInputElement, IUploadProps>((args, ref) => {
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState<File[]>();
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const {
    prefix,
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
    height,
    callback,
    errCallback,
    setValue,
    ...uploadProps
  } = args;
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const FILE_SIZE = fileSize;
  const SUPPORTED_FORMATS = fileFormat;

  const classes = generatePrefixClasses(
    uploadClasses,
    `${prefix ? `${prefix}-` : ''}upload`,
  );

  const rootClassName = classNames(
    classes.root,
    {
      // disabled
      [classes.disabled]: args.disabled,

      // error
      [classes.isError]: args.isError,

      // shape
      [classes.button]: args.shape === 'button',
      [classes.area]: args.shape === 'area',
      [classes.drag]: args.shape === 'drag',
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
    setIsOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsOver(false);

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
  console.log('@file', imageUrl);
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
        {args.shape === 'button' ? prefixIcon : null}
        <span className="prefix-text">{args.shape === 'button' ? prefixText : null}</span>
        <input
          type="file"
          id={htmlForId}
          accept={'.pdf'}
          onChange={handleChangeFile}
          style={{ display: 'none' }}
          autoComplete="off"
        />
        <div className="suffix-wrapper">
          <p className="suffix-icon">{args.shape !== 'button' ? suffixIcon : null}</p>
          <p>{args.shape !== 'button' ? suffixText : null}</p>
        </div>
      </label>
      {files
        ? files?.map((file) => (
            <div
              className="flex items-center justify-between rounded-md hover:bg-gray-100"
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
      {imageUrl?.map((image, i) => <img src={image} alt="uploadImage" key={i} />)}
    </>
  );
});
