//add toast testing
import { render, screen, within } from '@testing-library/react';
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

  const getRow = () => {
    const grid = screen.getByRole('grid');
    return within(grid)
      .getByText('Pizza Hub')
      .closest('[role="row"]') as HTMLElement;
  };

  const getActionDialog = async () => {
    const actionButton = await within(row).findByTestId('action-btn');
    await user.click(actionButton);

    const actionDialog = await screen.findByTestId('restaurant-action-menu');
    return actionDialog;
  };

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
    expect(toast.success).toHaveBeenCalledWith('Status Changed Successfully');
  });

  test('opens restaurant drawer when clicks on view', async () => {
    const actionDialog = await getActionDialog();
    const viewButton = within(actionDialog).getByRole('menuitem', {
      name: /view/i,
    });
    await user.click(viewButton);

    expect(await screen.findByText(/address/i)).toBeInTheDocument();
  });

  test('handles delete action based on user role', async () => {
    mockHandleDelete.mockResolvedValue({
      status: 200,
      data: { message: 'Restaurant deleted successfully' },
    });

    const actionDialog = await getActionDialog();
    const deleteButton = within(actionDialog).getByRole('menuitem', {
      name: /delete/i,
    });

    if (role === 'admin') {
      expect(deleteButton).toHaveAttribute('aria-disabled', 'true');
    } else {
      expect(deleteButton).not.toHaveAttribute('aria-disabled', 'true');
      await user.click(deleteButton);
      const confirmButton = await screen.findByRole('button', {
        name: /confirm/i,
      });
      await user.click(confirmButton);

      expect(mockHandleDelete).toHaveBeenCalledWith(1);
      expect(toast.success).toHaveBeenCalledWith(
        'Restaurant deleted successfully',
      );
    }
  });

  test('opens edit dialog when clicks on edit', async () => {
    const actionDialog = await getActionDialog();
    const editButton = within(actionDialog).getByRole('menuitem', {
      name: /edit/i,
    });
    await user.click(editButton);
    expect(
      await screen.findByTestId('restaurant-edit-dialog'),
    ).toBeInTheDocument();
  });
});
