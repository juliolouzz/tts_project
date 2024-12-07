import { render, screen } from '@testing-library/vue';
import '@testing-library/jest-dom';
import Hero from './Hero.vue';

// Mock vue-clerk
vi.mock('vue-clerk', () => ({
  SignedIn: {
    template: '<div><slot /></div>',
  },
  SignedOut: {
    template: '<div><slot /></div>',
  },
}));

describe('Hero Component', () => {
  it('renders correctly', async () => {
    render(Hero);
    expect(screen.getByText(/Generate audio for/i)).toBeInTheDocument();
  });
});
