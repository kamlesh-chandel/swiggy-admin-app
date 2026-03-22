import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, type FieldConfig } from '../form';

interface TestFormValues {
  name: string;
  email: string;
}

const fields: FieldConfig<TestFormValues>[] = [
  {
    id: 'name',
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    minLength: 3,
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
  },
];

describe('Form Component', () => {
  let user: ReturnType<typeof userEvent.setup>;
  const handleSubmit = vi.fn();

  beforeEach(() => {
    user = userEvent.setup();
  });

  const renderForm = (props = {}) => {
    render(
      <Form<TestFormValues>
        fields={fields}
        onSubmit={handleSubmit}
        buttonText="Submit"
        {...props}
      />,
    );
  };

  const getNameTextBox = () => screen.getByRole('textbox', { name: /name/i });
  const getEmailTextBox = () => screen.getByRole('textbox', { name: /email/i });
  const getSubmitButton = () => screen.getByRole('button');

  test('renders all fields', () => {
    renderForm();

    expect(getNameTextBox()).toBeInTheDocument();
    expect(getEmailTextBox()).toBeInTheDocument();
  });

  describe('disable submit button', () => {
    test('initially when no default values are provided', () => {
      renderForm();
      expect(getSubmitButton()).toBeDisabled();
    });
    test('when loading is true', () => {
      renderForm({ loading: true });
      expect(getSubmitButton()).toBeDisabled();
    });
  });

  describe('enable submit button', () => {
    test('when valid default values are provided', () => {
      renderForm({
        defaultValues: {
          name: 'Default Name',
          email: 'default@test.com',
        },
      });

      expect(getSubmitButton()).toBeEnabled();
    });
    test('when required fields are valid', async () => {
      renderForm();

      await user.type(getNameTextBox(), 'abc');
      await user.type(getEmailTextBox(), 'abc@test.com');

      expect(getSubmitButton()).toBeEnabled();
    });
  });

  describe('Name field validation', () => {
    test('does not show error when name is valid', async () => {
      renderForm();

      await user.type(getNameTextBox(), 'abcd');

      expect(
        screen.queryByText(/name must be at least 3 characters/i),
      ).not.toBeInTheDocument();
    });

    test('shows error when name is shorter than 3 characters', async () => {
      renderForm();

      await user.type(getNameTextBox(), 'ab');

      expect(
        screen.getByText(/name must be at least 3 characters/i),
      ).toBeInTheDocument();
    });
  });

  describe('Email field validation', () => {
    test('does not show error when email format is valid', async () => {
      renderForm();
      await user.type(getEmailTextBox(), 'abc@test.com');
      expect(
        screen.queryByText(/invalid email format/i),
      ).not.toBeInTheDocument();
    });

    test('shows error when email format is invalid', async () => {
      renderForm();
      await user.type(getEmailTextBox(), 'invalid-email');
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  test('calls onSubmit when form is valid and submitted', async () => {
    renderForm();

    await user.type(getNameTextBox(), 'abc');
    await user.type(getEmailTextBox(), 'abc@test.com');

    await user.click(getSubmitButton());

    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'abc',
      email: 'abc@test.com',
    });
  });

  test('renders default values correctly', () => {
    renderForm({
      defaultValues: {
        name: 'Default Name',
        email: 'default@test.com',
      },
    });

    expect(getNameTextBox()).toHaveValue('Default Name');
    expect(getEmailTextBox()).toHaveValue('default@test.com');
  });
});
