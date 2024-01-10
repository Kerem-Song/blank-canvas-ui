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

      console.log('@upload.files?.[0].name', upload.files?.[0]?.size);
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
