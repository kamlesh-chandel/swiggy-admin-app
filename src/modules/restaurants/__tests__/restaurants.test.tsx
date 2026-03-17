import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Restaurants from '../index';

vi.mock('../restaurant.service');

let mockRole = 'super_admin';
vi.mock('@/context/auth/useAuth', () => ({
  useAuth: () => ({
    user: { role: mockRole },
  }),
}));

const mockHandleCreate = vi.fn();
const mockHandleToggle = vi.fn();
const mockHandleDelete = vi.fn();

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
    loading: false,
    error: null,
    handleDelete: mockHandleDelete,
    handleToggle: mockHandleToggle,
    handleCreate: mockHandleCreate,
    handleUpdate: vi.fn(),
    mutationLoading: false,
  }),
}));

vi.mock('../hooks/useRestaurantDetails', () => ({
  useRestaurantDetails: () => ({
    data: null,
    fetchDetails: vi.fn(),
  }),
}));

const ROLES = ['super_admin'];

describe.each(ROLES)('Add Restaurant Flow (%s)', (role) => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    mockRole = role;
    user = userEvent.setup();
  });

  const renderRestaurantsPage = () => {
    render(
      <MemoryRouter>
        <Restaurants />
      </MemoryRouter>,
    );
  };

  const clickAddButton = async () => {
    const addButton = screen.getByRole('button', { name: /add/i });
    await user.click(addButton);
  };

  const getNameTextBox = () => screen.findByRole('textbox', { name: /name/i });

  const getAddressTextBox = () =>
    screen.findByRole('textbox', { name: /address/i });

  const getCityTextBox = () => screen.findByRole('textbox', { name: /city/i });

  const getRatingTextBox = () =>
    screen.findByRole('spinbutton', { name: /rating/i });

  const getCreateRestaurantButton = () =>
    screen.findByRole('button', { name: /create restaurant/i });

  describe('Add Restaurant Dialog', () => {
    beforeEach(async () => {
      renderRestaurantsPage();
      await clickAddButton();
    });

    test('opens add restaurant dialog when clicking Add button', () => {
      expect(screen.getByText('Add Restaurant')).toBeInTheDocument();
    });

    test('renders all initial form fields', async () => {
      expect(await getNameTextBox()).toBeInTheDocument();
      expect(await getAddressTextBox()).toBeInTheDocument();
      expect(await getCityTextBox()).toBeInTheDocument();
      expect(await getRatingTextBox()).toBeInTheDocument();
    });

    test('renders disabled create restaurant button initially', async () => {
      const button = await getCreateRestaurantButton();
      expect(button).toBeDisabled();
    });

    describe('Name field validation', () => {
      let nameTextBox: Awaited<ReturnType<typeof getNameTextBox>>;
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
      let addressTextBox: Awaited<ReturnType<typeof getAddressTextBox>>;
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
      let cityTextBox: Awaited<ReturnType<typeof getCityTextBox>>;
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
      let ratingTextBox: Awaited<ReturnType<typeof getRatingTextBox>>;
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
  });

  test('click create restaurant button', async () => {
    mockHandleCreate.mockResolvedValue({
      status: 201,
      data: {
        message: 'Restaurant created successfully',
      },
    });

    renderRestaurantsPage();
    await clickAddButton();

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
  });

  test('toggles restaurant status when clicks on switch input', async () => {
    renderRestaurantsPage();

    const row = screen.getByText('Pizza Hub').closest('[role="row"]');
    const switchInput = row?.querySelector('input[type="checkbox"]');
    expect(switchInput).toBeInTheDocument();

    await user.click(switchInput!);

    expect(mockHandleToggle).toHaveBeenCalledWith(1, false);
  });

  test('opens action menu when clicks on action button', async () => {
    renderRestaurantsPage();

    const row = screen
      .getByText('Pizza Hub')
      .closest('[role="row"]') as HTMLElement;
    const actionButton = within(row!).getByRole('button');

    await user.click(actionButton);

    expect(await screen.findByText(/view/i)).toBeInTheDocument();
  });

  test('opens restaurant drawer when clicks on view', async () => {
    renderRestaurantsPage();

    const row = screen
      .getByText('Pizza Hub')
      .closest('[role="row"]') as HTMLElement;
    const actionButton = within(row!).getByRole('button');

    await user.click(actionButton);

    const viewButton = await screen.findByText(/view/i);
    await user.click(viewButton);

    expect(await screen.findByText(/address/i)).toBeInTheDocument();
  });

  test('deletes restaurant when clicks on delete', async () => {
    mockHandleDelete.mockResolvedValue({
      status: 200,
      data: { message: 'Deleted' },
    });

    renderRestaurantsPage();

    const row = screen.getByText('Pizza Hub').closest('[role="row"]');
    const actionButton = row?.querySelector('button');

    await user.click(actionButton!);

    const deleteButton = await screen.findByText(/delete/i);
    await user.click(deleteButton);

    const confirmButton = await screen.findByRole('button', {
      name: /delete/i,
    });

    await user.click(confirmButton);

    expect(mockHandleDelete).toHaveBeenCalledWith(1);
  });

  test('opens edit restaurant dialog when clicks on edit', async () => {
    renderRestaurantsPage();

    const row = screen.getByText('Pizza Hub').closest('[role="row"]');
    const actionButton = row?.querySelector('button');

    await user.click(actionButton!);

    const editButton = await screen.findByRole('menuitem', { name: /edit/i });

    await user.click(editButton);

    expect(await screen.findByText(/edit restaurant/i)).toBeInTheDocument();
  });
});
