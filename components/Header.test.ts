import { render, screen, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
import Header from './Header.vue';

// Mock vue-clerk
vi.mock('vue-clerk', () => ({
  SignedIn: {
    template: '<div><slot /></div>',
  },
  SignedOut: {
    template: '<div><slot /></div>',
  },
  UserButton: {
    template: '<button>User</button>',
  },
}));

describe('Header Component', () => {
  it('renders correctly', async () => {
    render(Header);
    expect(screen.getByText(/🔈 TTS Project/i)).toBeInTheDocument();
  });

  it('emits login event when Login button is clicked', async () => {
    const { emitted } = render(Header);
    const loginButton = screen.getByText((content, element) => {
      return element?.getAttribute('label') === 'Login';
    });
    await fireEvent.click(loginButton);
    expect(emitted()).toHaveProperty('login');
  });
});
