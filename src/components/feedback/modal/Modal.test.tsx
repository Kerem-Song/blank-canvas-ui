import { Button } from '@components/general/button';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import React from 'react';

import { Modal } from './Modal';
import { modalClasses } from './ModalClasses';

describe('<Modal />', () => {
  const confirmFunc = vi.fn();
  const cancelFunc = vi.fn();
  const customFunc = vi.fn();

  const modalChild = (
    <div className="contents">
      <div className="title">
        <span>title</span>
      </div>
      <div className="text">
        <p>desc</p>
      </div>
      <input type="password" />
    </div>
  );

  it('렌더링 체크', () => {
    render(
      <Modal
        isOpen={true}
        confirmFunc={confirmFunc}
        cancelFunc={cancelFunc}
        overalyClassName={modalClasses.overlay}
        message={'모달테스트'}
        description={'상세 설명입니다 진행하시겠습니까?'}
        confirmButton="확인"
        cancelButton="취소"
        shouldCloseOnEsc={true}
        useEscButton={true}
        children={modalChild}
      />,
    );

    const modal = screen.getByText('모달테스트').parentElement
      ?.parentElement as HTMLDivElement;
    expect(modal.classList.contains(modalClasses.root)).toBeTruthy();
  });

  it('버튼 클릭시 모달 오픈 체크', () => {
    const useOpenModal = () => {
      const [open, setOpen] = React.useState<boolean>(false);
      const handleOpen = () => setOpen(true);

      return { open, handleOpen };
    };
    const { result } = renderHook(() => useOpenModal());
    const handleModalOpen = vi.fn().mockImplementation(result.current.handleOpen);
    const onAfterOpen = vi.fn();

    render(
      <>
        <Button onClick={handleModalOpen}>button</Button>
        <Modal
          isOpen={result.current.open}
          confirmFunc={confirmFunc}
          cancelFunc={cancelFunc}
          overalyClassName={modalClasses.overlay}
          message={'모달테스트'}
          description={'상세 설명입니다 진행하시겠습니까?'}
          confirmButton="확인"
          cancelButton="취소"
          shouldCloseOnEsc={true}
          useEscButton={true}
          children={modalChild}
          onAfterOpen={onAfterOpen}
        />
      </>,
    );

    const button = screen.getByRole('button');

    act(() => {
      fireEvent.click(button);

      onAfterOpen();
    });

    expect(result.current.open).toBe(true);
    expect(onAfterOpen).toBeCalledTimes(1);
  });

  it('Modal 버튼 체크', () => {
    render(
      <Modal
        isOpen={true}
        confirmFunc={confirmFunc}
        cancelFunc={cancelFunc}
        customFunc={customFunc}
        overalyClassName={modalClasses.overlay}
        message={'모달테스트'}
        description={'상세 설명입니다 진행하시겠습니까?'}
        confirmButton="확인"
        cancelButton="취소"
        customButton="커스텀"
        shouldCloseOnEsc={true}
        useEscButton={true}
        children={modalChild}
      />,
    );

    const confirmBtn = screen.getByText('확인');
    const cancelBtn = screen.getByText('취소');
    const customBtn = screen.getByText('커스텀');

    // 확인 버튼 클릭
    fireEvent.click(confirmBtn);
    expect(confirmFunc).toBeCalledTimes(1);

    // 취소 버튼 클릭
    fireEvent.click(cancelBtn);
    expect(cancelFunc).toBeCalledTimes(1);

    // 커스텀 버튼 클릭
    fireEvent.click(customBtn);
    expect(customFunc).toBeCalledTimes(1);
  });

  it('esc 버튼 클릭 시 Modal 동작 체크', () => {
    const useOpenModal = () => {
      const [open, setOpen] = React.useState<boolean>(true);
      const handleOpen = () => setOpen(!open);

      return { open, handleOpen };
    };
    const { result } = renderHook(() => useOpenModal());

    const { container } = render(
      <Modal
        isOpen={result.current.open}
        confirmFunc={confirmFunc}
        cancelFunc={cancelFunc}
        customFunc={customFunc}
        overalyClassName={modalClasses.overlay}
        message={'모달테스트'}
        description={'상세 설명입니다 진행하시겠습니까?'}
        confirmButton="확인"
        cancelButton="취소"
        customButton="커스텀"
        shouldCloseOnEsc={true}
        useEscButton={true}
        children={modalChild}
      />,
    );

    act(() => {
      fireEvent.keyDown(container, {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
      });

      result.current.handleOpen();
    });

    expect(result.current.open).toBe(false);
  });

  it('useEscButton 렌더링 및 동작 체크', () => {
    const useOpenModal = () => {
      const [open, setOpen] = React.useState<boolean>(true);
      const handleOpen = () => setOpen(!open);

      return { open, handleOpen };
    };
    const { result } = renderHook(() => useOpenModal());

    render(
      <Modal
        isOpen={result.current.open}
        confirmFunc={confirmFunc}
        cancelFunc={cancelFunc}
        customFunc={customFunc}
        overalyClassName={modalClasses.overlay}
        message={'모달테스트'}
        description={'상세 설명입니다 진행하시겠습니까?'}
        confirmButton="확인"
        cancelButton="취소"
        customButton="커스텀"
        shouldCloseOnEsc={true}
        useEscButton={true}
        children={modalChild}
      />,
    );

    const escBtn = screen.getByTitle('esc');

    act(() => {
      fireEvent.click(escBtn);
      result.current.handleOpen();
    });

    expect(result.current.open).toBe(false);
  });

  it('shouldCloseOnOverlayClick 체크', () => {
    const useOpenModal = () => {
      const [open, setOpen] = React.useState<boolean>(true);
      const handleOpen = () => setOpen(!open);

      return { open, handleOpen };
    };
    const { result } = renderHook(() => useOpenModal());

    render(
      <Modal
        isOpen={result.current.open}
        confirmFunc={confirmFunc}
        cancelFunc={cancelFunc}
        customFunc={customFunc}
        overalyClassName={modalClasses.overlay}
        message={'모달테스트'}
        description={'상세 설명입니다 진행하시겠습니까?'}
        confirmButton="확인"
        cancelButton="취소"
        customButton="커스텀"
        shouldCloseOnEsc={true}
        useEscButton={true}
        children={modalChild}
      />,
    );

    act(() => {
      fireEvent.click(document.body);
      result.current.handleOpen();
    });

    expect(result.current.open).toBe(false);
  });
});
