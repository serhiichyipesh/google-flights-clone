import { Button } from './components/ui/button';
import { ModeToggle } from './components/theme/mode-toggle';
import { ThemeProvider } from './components/theme';

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="bg-secondary text-card">
        Test sss sssss <Button variant="destructive">Tetsttstststs</Button>
      </div>

      <ModeToggle />
    </ThemeProvider>
  );
}
