import icon from '@icons/ic_collapse_arrow_up.svg';
import { fireEvent, render, screen } from '@testing-library/react';

import { Collapse } from './Collapse';

describe('<Collapse />', () => {
  const children = (
    <div className="desc">
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris varius sodales
        mauris id efficitur. Sed condimentum sagittis tincidunt. Vestibulum vel orci
        tempus, pharetra nibh ac, accumsan leo. Interdum et malesuada fames ac ante ipsum
        primis in faucibus. Suspendisse consequat mollis metus, sed tempus lacus feugiat
        sit amet. Nunc pellentesque erat vel nulla pellentesque, et pharetra felis rutrum.
        Donec maximus metus rhoncus sapien dapibus viverra. Sed id dui et augue tincidunt
        scelerisque sed vel massa. In pellentesque felis quis risus lacinia rhoncus.
        Nullam vitae porttitor tellus. Quisque fringilla arcu risus, sit amet mattis quam
        pretium id. Quisque eget ante interdum, vulputate urna non, pellentesque est.
        Etiam dignissim enim ut ex gravida aliquam.
      </span>
    </div>
  );

  it('렌더링 체크', () => {
    render(<Collapse children={children} />);
    const collapse = screen.getByRole('presentation');
    expect(collapse?.className === 'header').toBeTruthy();
  });

  it('제목 노출 여부 체크', () => {
    const { rerender } = render(
      <Collapse
        label={'title'}
        children={children}
        showIcon={true}
        expandIcon={icon}
        expandIconPosition={'end'}
      />,
    );
    const title = screen.getByRole('presentation').firstChild as HTMLDivElement;
    expect(title.classList.contains('label')).toBeTruthy();

    rerender(
      <Collapse
        children={children}
        showIcon={true}
        expandIcon={icon}
        expandIconPosition={'end'}
      />,
    );
    const nonTitle = screen.getByRole('presentation').firstChild
      ?.firstChild as HTMLDivElement;
    expect(nonTitle.textContent).toEqual('');
  });

  it('collapse 버튼 노출 여부', () => {
    const { rerender } = render(
      <Collapse
        children={children}
        showIcon={true}
        expandIcon={icon}
        expandIconPosition={'end'}
      />,
    );

    // 버튼 노출
    const showIcon = screen.getByRole('button');
    expect(showIcon?.classList.contains('expand-icon')).toBeTruthy();
    expect(showIcon?.classList.contains('expand')).toBeTruthy();

    // 버튼 미노출
    rerender(<Collapse children={children} showIcon={false} />);
    const header = screen.getByRole('presentation');
    expect(header.classList.contains('expand-icon')).toBeFalsy();
  });

  it('collapse 클릭 시 children 노출 체크', () => {
    const { container } = render(
      <Collapse
        children={children}
        showIcon={true}
        expandIcon={icon}
        expandIconPosition="end"
      />,
    );

    const button = screen.getByRole('button');
    const child = container.querySelector('.children');

    // collapse 클릭하여 children 노출
    fireEvent.click(button);
    expect(child?.classList.contains('invisible')).toBeFalsy();

    // collapse 클릭하여 노출 되어있는 children 비노출
    fireEvent.click(button);
    expect(child?.classList.contains('invisible')).toBeTruthy();
  });
});
