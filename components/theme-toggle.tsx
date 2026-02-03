'use client';

import { Moon, Sun } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    if (stored) {
      setIsDark(stored === 'dark');
      document.documentElement.classList.toggle('dark', stored === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      window.localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-xs">{isDark ? 'Light mode' : 'Dark mode'}</span>
    </Button>
  );
}
