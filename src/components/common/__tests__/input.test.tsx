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

  test('renders input with label', () => {
    renderInput();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  test('displays provided value', () => {
    renderInput({ value: 'abc', onChange: vi.fn() });

    expect(getInputTextBox()).toHaveValue('abc');
  });

  test('calls onChange with correct event when typing', async () => {
    const handleChange = vi.fn();

    renderInput({ onChange: handleChange });

    await user.type(getInputTextBox(), 'a');

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe('a');
  });

  test('shows error with helper text', () => {
    renderInput({ error: true, helperText: 'Error message' });
    expect(screen.getByText(/error message/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  test('renders number input when type is number', () => {
    renderInput({ type: 'number' });

    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  test('renders file input with correct type', () => {
    renderInput({ type: 'file', accept: 'image/' });
    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLElement;
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('accept', 'image/');
  });
});
