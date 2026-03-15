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

  const getButton = () => screen.getByRole('button', { name: /submit/i });

  test('renders button text', () => {
    renderButton();

    const button = getButton();

    expect(button).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    renderButton({ onClick: handleClick });

    const button = getButton();
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('button is disabled when disabled or loading', () => {
    const handleClick = vi.fn();

    renderButton({ onClick: handleClick, disabled: true });

    let button = getButton();

    expect(button).toBeDisabled();

    renderButton({ onClick: handleClick, loading: true });

    button = getButton();

    expect(button).toBeDisabled();
  });

  test('shows loader when loading is true', () => {
    renderButton({ loading: true });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
