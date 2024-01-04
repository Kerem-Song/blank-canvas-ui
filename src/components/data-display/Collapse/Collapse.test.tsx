import { render, screen } from '@testing-library/react';

import { Collapse } from './Collapse';

describe('<Collapse />', () => {
  const children = (
    <div>
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
  });
});
