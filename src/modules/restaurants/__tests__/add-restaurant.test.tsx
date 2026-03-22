import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Restaurants from '../index';
import { toast } from 'react-toastify';

vi.mock('../restaurant.service');

let mockRole = 'super_admin';
vi.mock('@/context/auth/useAuth', () => ({
  useAuth: () => ({
    user: { role: mockRole },
  }),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
  },
}));

const mockHandleCreate = vi.fn();
vi.mock('../hooks/useRestaurants', () => ({
  useRestaurants: () => ({
    data: [
      {
        id: 1,
        name: 'Pizza Hub',
        address: 'Udaipur',
        city: 'Udaipur',
        rating: 4,
        totalOrders: 10,
        totalRevenue: 1000,
        isActive: true,
      },
    ],
    handleCreate: mockHandleCreate,
  }),
}));

const ROLES = ['super_admin', 'admin'];

describe.each(ROLES)('Add Restaurant Flow (%s)', (role) => {
  let user: ReturnType<typeof userEvent.setup>;

  const clickAddButton = async () => {
    const addButton = screen.getByTestId('add-restaurant-button');
    await user.click(addButton);
  };

  const renderRestaurantsPage = () => {
    render(
      <MemoryRouter>
        <Restaurants />
      </MemoryRouter>,
    );
  };

  beforeEach(async () => {
    mockRole = role;
    user = userEvent.setup();
    renderRestaurantsPage();
    await clickAddButton();
  });

  const getNameTextBox = () => screen.findByRole('textbox', { name: /name/i });

  const getAddressTextBox = () =>
    screen.findByRole('textbox', { name: /address/i });

  const getCityTextBox = () => screen.findByRole('textbox', { name: /city/i });

  const getRatingTextBox = () =>
    screen.findByRole('spinbutton', { name: /rating/i });

  const getCreateRestaurantButton = () =>
    screen.findByRole('button', { name: /create restaurant/i });

  test('opens add restaurant dialog on Add button click', async () => {
    expect(
      await screen.findByTestId('restaurant-add-dialog'),
    ).toBeInTheDocument();
  });

  test('renders empty form fields and disables create button initially', async () => {
    expect(await getNameTextBox()).toHaveValue('');
    expect(await getAddressTextBox()).toHaveValue('');
    expect(await getCityTextBox()).toHaveValue('');
    expect(await getRatingTextBox()).toHaveValue(null);

    const button = await getCreateRestaurantButton();
    expect(button).toBeDisabled();
  });

  describe('Name field validation', () => {
    let nameTextBox: HTMLElement;
    beforeEach(async () => {
      nameTextBox = await getNameTextBox();
    });
    test('does not show error when name is valid', async () => {
      await user.type(nameTextBox, 'abcdef');

      expect(
        screen.queryByText(/name must be at least 3 characters/i),
      ).not.toBeInTheDocument();
    });

    test('shows error when name is shorter than 3 characters', async () => {
      await user.type(nameTextBox, 'ab');

      expect(
        screen.getByText(/name must be at least 3 characters/i),
      ).toBeInTheDocument();
    });
  });

  describe('Address field validation', () => {
    let addressTextBox: HTMLElement;
    beforeEach(async () => {
      addressTextBox = await getAddressTextBox();
    });
    test('does not show error when address is valid', async () => {
      await user.type(addressTextBox, 'abcdef');

      expect(
        screen.queryByText(/address must be at least 5 characters/i),
      ).not.toBeInTheDocument();
    });

    test('shows error when address is shorter than 5 characters', async () => {
      await user.type(addressTextBox, 'ab');

      expect(
        screen.getByText(/address must be at least 5 characters/i),
      ).toBeInTheDocument();
    });
  });

  describe('City field validation', () => {
    let cityTextBox: HTMLElement;
    beforeEach(async () => {
      cityTextBox = await getCityTextBox();
    });
    test('does not show error when city is valid', async () => {
      await user.type(cityTextBox, 'abc');
      expect(
        screen.queryByText(/city must be at least 2 characters/i),
      ).not.toBeInTheDocument();
    });

    test('shows error when city is shorter than 2 characters', async () => {
      await user.type(cityTextBox, 'a');
      expect(
        screen.getByText(/city must be at least 2 characters/i),
      ).toBeInTheDocument();
    });
  });

  describe('Rating field validation', () => {
    let ratingTextBox: HTMLElement;
    beforeEach(async () => {
      ratingTextBox = await getRatingTextBox();
    });
    test('does not show error when rating is valid', async () => {
      await user.type(ratingTextBox, '3');

      expect(
        screen.queryByText(/rating must be between 0 and 5/i),
      ).not.toBeInTheDocument();
    });

    test.each([
      { value: '-1', label: 'less than 0' },
      { value: '7', label: 'greater than 5' },
    ])('shows error when rating is $label', async ({ value }) => {
      await user.clear(ratingTextBox);
      await user.type(ratingTextBox, value);

      expect(
        screen.getByText(/rating must be between 0 and 5/i),
      ).toBeInTheDocument();
    });
  });

  test('click create restaurant button', async () => {
    mockHandleCreate.mockResolvedValue({
      status: 201,
      data: {
        message: 'Restaurant created successfully',
      },
    });

    const nameTextBox = await getNameTextBox();
    const addressTextBox = await getAddressTextBox();
    const cityTextBox = await getCityTextBox();
    const ratingTextBox = await getRatingTextBox();
    const createButton = await getCreateRestaurantButton();

    await user.type(nameTextBox, 'restaurant abcd');
    await user.type(addressTextBox, 'shobhagpura');
    await user.type(cityTextBox, 'udaipur');
    await user.type(ratingTextBox, '4');

    await user.click(createButton);

    expect(mockHandleCreate).toHaveBeenCalledWith({
      name: 'restaurant abcd',
      address: 'shobhagpura',
      city: 'udaipur',
      rating: 4,
    });
    expect(toast.success).toHaveBeenCalledWith(
      'Restaurant created successfully',
    );
  });
});
