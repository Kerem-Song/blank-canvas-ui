import { InputHTMLAttributes, ReactNode } from 'react';

import { TUploadFileFormat } from './UploadClasses';

export interface IUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * 업로드 에러일 때 디자인하기 위한 boolean 값
   */
  isError?: boolean;

  /**
   * 업로드 입력의 모양
   */
  shape: 'button' | 'area' | 'drag';

  /**
   * 업로드 input에 할당할 id
   */
  htmlForId: string;

  /**
   * 파일이 등록될 경로(react-hook-form)
   */
  filePath: string;

  /**
   * 파일 사이즈 제한(byte단위)
   */
  fileSize: number;

  /**
   * 파일 형식 제한(uploadFileFormat을 패키지로부터 import 후 배열에 넣어 사용.
   * ex: fileFormat={[uploadFileFormat.png, uploadFileFormat.pdf]} )
   * @type "image/jpg" | "image/jpeg" | "image/png" | "image/svg" | "image/*" | "video/*" | "audio/*" | ".pdf" | ".csv" | ".xls" | ".xlsx" | ".text/plain" | ".text/html" | ".FILETYPE"
   */
  fileFormat: TUploadFileFormat[];

  /**
   *  버튼 형식일 때 들어가는 prefix 텍스트
   */
  prefixText?: ReactNode;

  /**
   * 버튼 형식일때 첨부할 아이콘
   * 아이콘은 <img src={}/>으로 할당하거나 svg?react 컴포넌트 형식으로 할당.
   */
  prefixIcon?: ReactNode;

  /**
   * 버튼 형식이 아닐 때 들어가는 suffix 텍스트
   */
  suffixText?: ReactNode;

  /**
   * 버튼 형식이 아닐 때 들어가는 suffix 아이콘
   * 아이콘은 <img src={}/>으로 할당하거나 svg?react 컴포넌트 형식으로 할당.
   */
  suffixIcon?: ReactNode;

  /**
   * 업로더의 넓이;
   */
  width?: number;

  /**
   * 업로더의 높이(rem) area, drag 스타일일때 필수.
   */
  height?: number;

  /**
   * 파일 이름 리스트 및 미리보기 영역 사용 여부
   */
  usePreview?: boolean;

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
