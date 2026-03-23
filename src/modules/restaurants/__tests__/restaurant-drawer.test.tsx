import { render, screen } from '@testing-library/react';
import RestaurantDrawer from '../components/restaurant-drawer';
import type { RestaurantDetails } from '../restaurant.types';

describe('RestaurantDrawer', () => {
  const mockOnClose = vi.fn();

  const baseData: RestaurantDetails = {
    id: 1,
    name: 'Pizza Hub',
    address: 'Shobhagpura',
    city: 'Udaipur',
    rating: 4,
    isActive: true,
    createdAt: '2024-01-01',
    analytics: {
      totalOrders: 10,
      totalRevenue: 1000,
    },
    foodItems: [],
  };

  const renderRestaurantDrawer = (props = {}) => {
    return render(
      <RestaurantDrawer
        open={true}
        onClose={mockOnClose}
        data={baseData}
        {...props}
      />,
    );
  };

  test('renders restaurant basic information', () => {
    renderRestaurantDrawer();
    expect(screen.getByText('Pizza Hub')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText(/Shobhagpura/i)).toBeInTheDocument();
    expect(screen.getByText(/Udaipur/i)).toBeInTheDocument();
  });

  test('renders analytics information', () => {
    renderRestaurantDrawer();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText(/₹1000/)).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });

  describe('Food Item array', () => {
    test('renders food items when food items array is not empty', async () => {
      const dataWithFoodItems: RestaurantDetails = {
        ...baseData,
        foodItems: [
          {
            id: 1,
            name: 'Burger',
            price: 120,
            description: 'tasty burger',
          },
        ],
      };

      renderRestaurantDrawer({ data: dataWithFoodItems });
      expect(await screen.findByText(/tasty burger/i)).toBeInTheDocument();
    });

    test('renders no food items when food items array is empty', () => {
      renderRestaurantDrawer();
      expect(screen.getByText(/no food items/i)).toBeInTheDocument();
    });
  });

  test('shows inactive status chip when restaurant is inactive', () => {
    const inactiveData: RestaurantDetails = {
      ...baseData,
      isActive: false,
    };

    renderRestaurantDrawer({ data: inactiveData });

    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });
});
