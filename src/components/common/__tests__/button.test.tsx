import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../button';

describe('Button Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  const renderButton = (props = {}) => {
    render(<Button {...props}>Submit</Button>);
  };

  const getButtonByRole = () => screen.getByRole('button', { name: /submit/i });

  test('renders button with children text', () => {
    renderButton();
    const button = getButtonByRole();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Submit');
  });

  test('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    renderButton({ onClick: handleClick });
    await user.click(getButtonByRole());
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  describe('Button should be disabled', () => {
    test('when disabled prop is true', () => {
      const handleClick = vi.fn();
      renderButton({ onClick: handleClick, disabled: true });
      expect(getButtonByRole()).toBeDisabled();
    });

    test('when loading prop is true', () => {
      const handleClick = vi.fn();
      renderButton({ onClick: handleClick, loading: true });
      expect(screen.getByRole('button')).toBeDisabled();
    });

    test('shows loader when loading prop is true', () => {
      renderButton({ loading: true });
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });
});
