import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Restaurants from '../index';
import { type Mock } from 'vitest';

import * as restaurantService from '../restaurant.service';

vi.mock('../restaurant.service');

let mockRole = 'super_admin';

vi.mock('@/context/auth/useAuth', () => ({
  useAuth: () => ({
    user: { role: mockRole },
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
    (restaurantService.getRestaurants as Mock).mockResolvedValue([]);
    let resolveRequest!: (value: unknown) => void;

    (restaurantService.createRestaurant as Mock).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRequest = resolve;
        }),
    );

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

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(createButton).toBeDisabled();

    resolveRequest({
      status: 201,
      data: {
        data: {
          id: 1,
          name: 'restaurant abcd',
          address: 'shobhagpura',
          city: 'udaipur',
          rating: 4,
        },
      },
    });
  });
});
