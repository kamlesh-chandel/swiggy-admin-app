import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../input';

describe('Input Component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  const renderInput = (props = {}) => {
    render(<Input label="Name" {...props} />);
  };

  const getInputTextBox = () => screen.getByRole('textbox');

  test('passes id and name props to input element', () => {
    renderInput({ id: 'name-input', name: 'name' });

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('id', 'name-input');
    expect(input).toHaveAttribute('name', 'name');
  });

  test('displays provided value', () => {
    renderInput({ value: 'abc' });

    expect(getInputTextBox()).toHaveValue('abc');
  });

  test('calls onChange with correct event when typing', async () => {
    const handleChange = vi.fn();

    renderInput({ onChange: handleChange });

    await user.type(getInputTextBox(), 'a');

    expect(handleChange).toHaveBeenCalledTimes(1);

    const event = handleChange.mock.calls[0][0];
    expect(event.target.value).toBe('a');
  });

  describe('Error scenarios', () => {
    test('does not mark input invalid when error is false', () => {
      renderInput({ error: false });

      expect(screen.getByRole('textbox')).not.toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });

    test('marks input invalid when error is true', () => {
      renderInput({ error: true });
      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-invalid',
        'true',
      );
    });
  });

  test('shows helper text when helperText given', () => {
    renderInput({ error: true, helperText: 'Error message' });
    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });

  test('renders number input when type is number', () => {
    renderInput({ type: 'number' });

    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  describe('File type behavior', () => {
    test('renders file input when type is file', () => {
      renderInput({ type: 'file' });
      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
    });

    test('does not render file input when type is not file', () => {
      renderInput({ type: 'text' });
      const fileInput = document.querySelector('input[type="file"]');
      expect(fileInput).not.toBeInTheDocument();
    });

    test('renders file input with accept attribute', () => {
      renderInput({ type: 'file', accept: 'image/' });
      const fileInput = document.querySelector('input[type="file"]');

      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveAttribute('accept', 'image/');
    });
  });
});
