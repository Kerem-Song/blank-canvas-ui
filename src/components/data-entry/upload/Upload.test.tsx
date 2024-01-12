import imgTest from '@icons/ic_img.svg';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Upload } from './Upload';

describe('<Upload />', () => {
  const callback = vi.fn();
  const errCallback = vi.fn();
  const setValue = vi.fn();

  it('렌더링 체크', () => {
    render(
      <Upload
        htmlForId="test"
        shape="button"
        filePath={''}
        fileSize={3000}
        fileFormat={['image/png', 'image/jpeg']}
        callback={callback}
        errCallback={errCallback}
        setValue={setValue}
        data-testid={'test'}
      />,
    );

    const upload = screen.getByTestId('test');
    expect(upload.classList.contains('bc-upload'));
  });

  it('shpae에 따른 업로드 모양 체크', () => {
    const { rerender } = render(
      <Upload
        htmlForId="test"
        shape="button"
        filePath={''}
        fileSize={3000}
        fileFormat={['image/png', 'image/jpeg']}
        callback={callback}
        errCallback={errCallback}
        setValue={setValue}
        data-testid={'test'}
      />,
    );

    const buttonShape = screen.getByTestId('test').parentElement;

    // shape이 button일 경우
    expect(buttonShape?.classList.contains('bc-upload-button')).toBeTruthy();

    // shape이 area일 경우
    rerender(
      <Upload
        htmlForId="test"
        shape="area"
        filePath={''}
        fileSize={3000}
        fileFormat={['image/png', 'image/jpeg']}
        callback={callback}
        errCallback={errCallback}
        setValue={setValue}
        data-testid={'test'}
      />,
    );
    const areaShape = screen.getByTestId('test').parentElement;
    expect(areaShape?.classList.contains('bc-upload-area')).toBeTruthy();

    // shape이 drag and drop일 경우
    rerender(
      <Upload
        htmlForId="test"
        shape="drag"
        filePath={''}
        fileSize={3000}
        fileFormat={['image/png', 'image/jpeg']}
        callback={callback}
        errCallback={errCallback}
        setValue={setValue}
        data-testid={'test'}
      />,
    );
    const dragShape = screen.getByTestId('test').parentElement;
    expect(dragShape?.classList.contains('bc-upload-drag')).toBeTruthy();
  });

  it('prefix 체크', () => {
    const { container } = render(
      <Upload
        htmlForId="test"
        shape="button"
        filePath={''}
        fileSize={3000}
        fileFormat={['image/png', 'image/jpeg']}
        callback={callback}
        errCallback={errCallback}
        setValue={setValue}
        data-testid={'test'}
        prefixText="a"
        prefixIcon={imgTest}
      />,
    );

    // 버튼에 쓰인 prefix text 체크
    const prefixText = container.querySelector('.bc-prefix-text');
    expect(prefixText?.textContent).toBe('a');

    // prefix icon 체크
    const prefixIcon = container.querySelector('.bc-prefix-icon');
    expect(prefixIcon?.children).not.toBeNull();
  });

  it('suffix 체크', () => {
    const { container } = render(
      <Upload
        htmlForId="test"
        shape="area"
        filePath={''}
        fileSize={3000}
        fileFormat={['image/png', 'image/jpeg']}
        callback={callback}
        errCallback={errCallback}
        setValue={setValue}
        data-testid={'test'}
        suffixIcon={imgTest}
        suffixText={'a'}
      />,
    );

    // 버튼에 쓰인 suffix text 체크
    const suffixText = container.querySelector('.bc-suffix-text');
    expect(suffixText?.textContent).toBe('a');

    // suffix icon 체크
    const suffixIcon = container.querySelector('.bc-suffix-icon');
    expect(suffixIcon?.children).not.toBeNull();
  });

  it('file upload 체크', async () => {
    const file = new File(['hello'], 'hello.jpeg', { type: 'image/jpeg' });
    const onChange = () => {
      callback();
      setValue();
    };
    const { container } = render(
      <Upload
        htmlForId="test"
        shape="button"
        filePath={''}
        fileSize={1000}
        fileFormat={['image/jpeg']}
        callback={callback}
        errCallback={errCallback}
        setValue={setValue}
        onChange={onChange}
        data-testid={'test'}
      />,
    );

    const upload = container.querySelector('#test') as HTMLInputElement;

    await waitFor(() => {
      fireEvent.click(upload);
      fireEvent.change(upload, {
        target: { files: [file] },
      });
    });

    // 파일 업로드 여부
    expect(upload.files).toHaveLength(1);

    // 올린 파일과 이름 일치
    expect(upload.files?.[0]?.name).toBe('hello.jpeg');

    // 올린 파일의 사이즈 제한 체크
    expect(upload.files?.[0]?.size).toBeLessThan(1000);

    // 올린 파일의 형식 제한 체크
    expect(upload.files?.[0].type).toBe('image/jpeg');

    // 업로드 후 실행되는 콜백
    expect(callback).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledTimes(1);
    expect(errCallback).toHaveBeenCalledTimes(0);
  });
});
