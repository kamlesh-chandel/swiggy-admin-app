//add toast testing
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

const mockHandleToggle = vi.fn();
const mockHandleDelete = vi.fn();
const mockHandleUpdate = vi.fn();

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
    handleDelete: mockHandleDelete,
    handleToggle: mockHandleToggle,
    handleUpdate: mockHandleUpdate,
  }),
}));

vi.mock('../hooks/useRestaurantDetails', () => ({
  useRestaurantDetails: () => ({
    data: null,
    fetchDetails: vi.fn(),
  }),
}));

const ROLES = ['super_admin', 'admin'];

describe.each(ROLES)('Restaurant Actions (%s)', (role) => {
  let user: ReturnType<typeof userEvent.setup>;

  const renderRestaurantsPage = () => {
    render(
      <MemoryRouter>
        <Restaurants />
      </MemoryRouter>,
    );
  };

  //get table also

  const getRow = () =>
    screen.getByText('Pizza Hub').closest('[role="row"]') as HTMLElement;

  let row: HTMLElement;
  beforeEach(() => {
    mockRole = role;
    user = userEvent.setup();
    renderRestaurantsPage();
    row = getRow();
  });

  test('update status when clicks on switch input', async () => {
    const switchButton = within(row).getByRole('switch');
    expect(switchButton).toBeInTheDocument();
    await user.click(switchButton);

    expect(mockHandleToggle).toHaveBeenCalledWith(1, false);
  });

  test('opens restaurant drawer when clicks on view', async () => {
    const actionButton = within(row).getByRole('button');
    await user.click(actionButton);
    const viewButton = await screen.findByRole('menuitem', { name: /view/i });
    await user.click(viewButton);

    expect(await screen.findByText(/address/i)).toBeInTheDocument();
  });

  //change delete to confirm
  test('delete restaurant when clicks on delete', async () => {
    mockHandleDelete.mockResolvedValue({
      status: 200,
      data: { message: 'Deleted' },
    });

    const actionButton = row?.querySelector('button');
    await user.click(actionButton!);
    const deleteButton = await screen.findByRole('menuitem', {
      name: /delete/i,
    });

    if (role === 'admin') {
      expect(deleteButton).toHaveAttribute('aria-disabled', 'true');
    } else {
      //check enable button
      await user.click(deleteButton);
      const confirmButton = await screen.findByRole('button', {
        name: /delete/i,
      });
      await user.click(confirmButton);

      expect(mockHandleDelete).toHaveBeenCalledWith(1);
    }
  });

  test('opens edit dialog when clicks on edit', async () => {
    const actionButton = row?.querySelector('button');
    await user.click(actionButton!);
    const editButton = await screen.findByRole('menuitem', { name: /edit/i });
    await user.click(editButton);
    //use test id
    expect(await screen.findByText(/edit restaurant/i)).toBeInTheDocument();
  });
});
