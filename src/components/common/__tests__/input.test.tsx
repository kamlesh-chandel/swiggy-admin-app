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

  test('renders input with label', () => {
    renderInput();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  test('allows user to type in input', async () => {
    renderInput();

    const inputBox = getInputTextBox();

    await user.type(inputBox, 'abc');

    expect(inputBox).toHaveValue('abc');
  });

  test('calls onChange when typing', async () => {
    const handleChange = vi.fn();

    renderInput({ onChange: handleChange });

    const inputBox = getInputTextBox();

    await user.type(inputBox, 'a');

    expect(handleChange).toHaveBeenCalled();
  });

  test('shows error message when error and helperText are provided', () => {
    renderInput({
      error: true,
      helperText: 'Error message',
    });

    expect(screen.getByText(/error message/i)).toBeInTheDocument();
  });

  test('renders number input when type is number', () => {
    renderInput({ type: 'number' });

    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  test('renders file input when type is file', () => {
    renderInput({ type: 'file' });

    const inputBox = screen.getByDisplayValue('');

    expect(inputBox).toHaveAttribute('type', 'file');
  });
});
