import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../dialog';

describe('Dialog Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  const renderDialog = (props = {}) => {
    const defaultProps = {
      open: true,
      title: 'Test Dialog',
      onClose: vi.fn(),
    };

    render(
      <Dialog {...defaultProps} {...props}>
        Dialog Content
      </Dialog>,
    );
  };

  const getTitle = () => screen.getByText(/test dialog/i);
  const getCancelButton = () => screen.getByRole('button', { name: /cancel/i });
  const getConfirmButton = () =>
    screen.getByRole('button', { name: /confirm/i });

  test('renders dialog title when open is true', () => {
    renderDialog();
    expect(getTitle()).toBeInTheDocument();
  });

  test('does not render dialog when open is false', () => {
    renderDialog({ open: false });
    expect(screen.queryByText(/test dialog/i)).not.toBeInTheDocument();
  });

  test('renders description when provided', () => {
    renderDialog({ description: 'Test description' });
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
  });

  test('renders content children', () => {
    renderDialog();

    expect(screen.getByText(/dialog content/i)).toBeInTheDocument();
  });

  test('calls onClose when cancel button is clicked', async () => {
    const onClose = vi.fn();
    const onConfirm = vi.fn();
    renderDialog({ onClose, onConfirm });
    await user.click(getCancelButton());
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onConfirm when confirm button is clicked', async () => {
    const onConfirm = vi.fn();

    renderDialog({ onConfirm });

    await user.click(getConfirmButton());

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  describe('Disable confirm button', () => {
    test('when loading prop is true', () => {
      renderDialog({
        loading: true,
        onConfirm: vi.fn(),
      });

      expect(getConfirmButton()).toBeDisabled();
    });

    test('confirm button is enabled when loading is false', () => {
      renderDialog({
        loading: false,
        onConfirm: vi.fn(),
      });

      expect(getConfirmButton()).toBeEnabled();
    });
  });

  test('does not render actions when showActions is false', () => {
    renderDialog({ showActions: false });

    expect(
      screen.queryByRole('button', { name: /cancel/i }),
    ).not.toBeInTheDocument();
  });
});
