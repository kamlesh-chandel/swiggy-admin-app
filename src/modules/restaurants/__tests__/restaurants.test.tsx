import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Restaurants from '../index';
import { type Mock } from 'vitest';

import * as restaurantService from '../restaurant.service';

vi.mock('../restaurant.service');

vi.mock('@/context/auth/useAuth', () => ({
  useAuth: () => ({
    user: { role: 'super_admin' },
  }),
}));

describe('Add Restaurant Flow', () => {
  const renderRestaurantsPage = () => {
    render(
      <MemoryRouter>
        <Restaurants />
      </MemoryRouter>,
    );
  };

  const clickAddButton = async () => {
    const addButton = screen.getByRole('button', { name: /add/i });
    await userEvent.click(addButton);
  };

  const getNameInput = () => screen.findByRole('textbox', { name: /name/i });

  const getAddressInput = () =>
    screen.findByRole('textbox', { name: /address/i });

  const getCityInput = () => screen.findByRole('textbox', { name: /city/i });

  const getRatingInput = () =>
    screen.findByRole('spinbutton', { name: /rating/i });

  const getCreateRestaurantButton = () =>
    screen.findByRole('button', { name: /create restaurant/i });

  describe('Add Restaurant Dialog', () => {
    beforeEach(async () => {
      renderRestaurantsPage();
      await clickAddButton();
    });

    test('opens add restaurant dialog when clicking Add button', async () => {
      expect(await screen.findByText('Add Restaurant')).toBeInTheDocument();
    });

    test('renders all initial form fields', async () => {
      expect(await getNameInput()).toBeInTheDocument();
      expect(await getAddressInput()).toBeInTheDocument();
      expect(await getCityInput()).toBeInTheDocument();
      expect(await getRatingInput()).toBeInTheDocument();
    });

    test('renders disabled create restaurant button initially', async () => {
      const button = await getCreateRestaurantButton();
      expect(button).toBeDisabled();
    });

    describe('Name field validation', () => {
      test('does not show error when name is valid', async () => {
        const nameInput = await getNameInput();

        await userEvent.type(nameInput, 'abcdef');

        expect(
          screen.queryByText(/name must be at least 3 characters/i),
        ).not.toBeInTheDocument();
      });

      test('shows error when name is shorter than 3 characters', async () => {
        const nameInput = await getNameInput();

        await userEvent.type(nameInput, 'ab');

        expect(
          await screen.findByText(/name must be at least 3 characters/i),
        ).toBeInTheDocument();
      });
    });

    describe('Address field validation', () => {
      test('does not show error when address is valid', async () => {
        const addressInput = await getAddressInput();

        await userEvent.type(addressInput, 'abcdef');

        expect(
          screen.queryByText(/address must be at least 5 characters/i),
        ).not.toBeInTheDocument();
      });

      test('shows error when address is shorter than 5 characters', async () => {
        const addressInput = await getAddressInput();

        await userEvent.type(addressInput, 'ab');

        expect(
          await screen.findByText(/address must be at least 5 characters/i),
        ).toBeInTheDocument();
      });
    });

    describe('City field validation', () => {
      test('does not show error when city is valid', async () => {
        const cityInput = await getCityInput();

        await userEvent.type(cityInput, 'abc');

        expect(
          screen.queryByText(/city must be at least 2 characters/i),
        ).not.toBeInTheDocument();
      });

      test('shows error when city is shorter than 2 characters', async () => {
        const cityInput = await getCityInput();

        await userEvent.type(cityInput, 'a');

        expect(
          await screen.findByText(/city must be at least 2 characters/i),
        ).toBeInTheDocument();
      });
    });

    describe('Rating field validation', () => {
      test('does not show error when rating is valid', async () => {
        const ratingInput = await getRatingInput();

        await userEvent.type(ratingInput, '3');

        expect(
          screen.queryByText(/rating must be between 1 and 5/i),
        ).not.toBeInTheDocument();
      });

      test('shows error when rating is less than 1', async () => {
        const ratingInput = await getRatingInput();

        await userEvent.type(ratingInput, '-1');

        expect(
          await screen.findByText(/rating must be between 1 and 5/i),
        ).toBeInTheDocument();
      });

      test('shows error when rating is greater than 5', async () => {
        const ratingInput = await getRatingInput();

        await userEvent.type(ratingInput, '7');

        expect(
          await screen.findByText(/rating must be between 1 and 5/i),
        ).toBeInTheDocument();
      });
    });
  });

  test('click create restaurant button', async () => {
    (restaurantService.getRestaurants as Mock).mockResolvedValue([]);

    (restaurantService.createRestaurant as Mock).mockResolvedValue({
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

    renderRestaurantsPage();
    await clickAddButton();

    const nameInput = await getNameInput();
    const addressInput = await getAddressInput();
    const cityInput = await getCityInput();
    const ratingInput = await getRatingInput();
    const createButton = await getCreateRestaurantButton();

    await userEvent.type(nameInput, 'restaurant abcd');
    await userEvent.type(addressInput, 'shobhagpura');
    await userEvent.type(cityInput, 'udaipur');
    await userEvent.type(ratingInput, '4');

    await userEvent.click(createButton);

    expect(restaurantService.createRestaurant).toHaveBeenCalledWith({
      name: 'restaurant abcd',
      address: 'shobhagpura',
      city: 'udaipur',
      rating: 4,
    });
  });
});
