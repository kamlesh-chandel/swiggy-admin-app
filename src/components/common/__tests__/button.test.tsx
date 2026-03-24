import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../button';

describe('Button Component', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  const renderButton = (props = {}) => {
    render(<Button {...props}>Submit</Button>);
  };
 console.log('hello')
  const getButtonByRole = () => screen.getByRole('button', { name: /submit/i });

  test('renders button with children', () => {
    renderButton();
    const button = getButtonByRole();
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveTextContent('Submit');
  });

  test('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    renderButton({ onClick: handleClick });
    await user.click(getButtonByRole());
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  describe('Button should be disabled', () => {
    test('when disabled prop is true', () => {
      renderButton({ disabled: true });
      expect(getButtonByRole()).toBeDisabled();
    });

    test('when loading prop is true', () => {
      renderButton({ loading: true });
      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });
});
