import { render, screen } from '@testing-library/react';
import Loader from '../loader';

describe('Loader Component', () => {
  const renderLoader = (props = {}) => {
    render(<Loader {...props} />);
  };

  const getLoader = () => screen.getByRole('progressbar');

  test('renders loader with custom size', () => {
    renderLoader({ size: 50 });

    expect(getLoader()).toHaveStyle({
      width: '50px',
      height: '50px',
    });
  });

  test('renders fullscreen loader when fullScreen is true', () => {
    renderLoader({ fullScreen: true });
    expect(getLoader().parentElement).toHaveStyle({
      position: 'fixed',
      inset: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
  });
});
