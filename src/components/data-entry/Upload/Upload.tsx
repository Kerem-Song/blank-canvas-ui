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

import { TUploadImageStyleClassKey, uploadClasses } from './uploadClasses';

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
   * 파일 사이즈 제한
   */
  fileSize: number;

  /**
   * 파일 형식 제한
   */
  fileFormat: TUploadImageStyleClassKey;

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
  setValue: () => void;
}

export const Upload = forwardRef<HTMLInputElement, IUploadProps>((args, ref) => {
  const [isOver, setIsOver] = useState(false);
  const [files, setFiles] = useState<FileList>();

  const {
    prefix,
    children,
    className,
    htmlForId,
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
    const FILE_SIZE = fileSize;
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

    if (e.target.files) {
      if (!SUPPORTED_FORMATS.includes(e.target.files[0]?.type)) {
        // errCallback();
        console.log('@e target 1', e.target.files[0]?.type);
        return;
      } else if (e.target.files[0].size > FILE_SIZE) {
        console.log('@e target failed');
        e.target.files = null;
        e.target.value = '';
        // errCallback();

        return;
      }
      console.log('@e target', e.target.files);
      setFiles(e.target.files);

      const targetFiles = Array.from(e.target.files);

      // Use FileReader to read file content
      targetFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onloadend = () => files && setValue();
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

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(e.dataTransfer.files);

    droppedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => files && setValue();
      reader.onerror = () => errCallback();

      reader.readAsDataURL(file);

      return reader;
    });
  };

  return (
    <>
      <label
        className={rootClassName}
        htmlFor={htmlForId}
        style={
          args.shape === 'drag'
            ? {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50px',
                width: '300px',
                border: '1px dotted',
                backgroundColor: isOver ? 'lightgray' : 'white',
              }
            : { height: `${height}rem`, width: `${width}rem` }
        }
        onDragOver={args.shape === 'drag' ? handleDragOver : undefined}
        onDragLeave={args.shape === 'drag' ? handleDragLeave : undefined}
        onDrop={args.shape === 'drag' ? handleDrop : undefined}
      >
        {args.shape === 'button' ? prefixIcon : null}
        <span className="prefix-text">{args.shape === 'button' ? prefixText : null}</span>
        <input
          type="file"
          id={htmlForId}
          accept=".png, .jpeg, .jpg"
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
        ? Array.from(files)?.map((file) => (
            <div key={file.name + '-' + file.lastModified}>
              <p>{file.name}</p>
              <p>{file.size}</p>
              <p>{file.lastModified}</p>
            </div>
          ))
        : null}
    </>
  );
});
