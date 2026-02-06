'use client';

import { Download, Image as ImageIcon, ShieldCheck, UserCircle2 } from 'lucide-react';
import * as React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SAMPLE_NAME = 'Shubham Giri';
const DEFAULT_BACKGROUND = '#B6E3F9';

export default function HomePage() {
  const [nameInput, setNameInput] = React.useState(SAMPLE_NAME);
  const [name, setName] = React.useState(SAMPLE_NAME);
  const [backgroundInput, setBackgroundInput] = React.useState(DEFAULT_BACKGROUND);
  const [background, setBackground] = React.useState(DEFAULT_BACKGROUND);
  const initials = React.useMemo(() => {
    const parts = name.trim().split(/\s+/);
    const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase());
    return letters.join('') || 'SG';
  }, [name]);

  const avatarUrl = React.useMemo(() => {
    const params = new URLSearchParams({ name });
    if (background) {
      params.set('background', background);
    }
    return `/api/avatar?${params.toString()}`;
  }, [background, name]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-foreground)]">
            <UserCircle2 size={22} />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
              Pastel Profile Studio
            </p>
            <h1 className="text-2xl font-semibold">Create gentle profile initials</h1>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <main className="mx-auto grid min-h-screen max-w-6xl place-content-center gap-10 px-6 pb-16 md:grid-cols-[1.1fr_0.9fr] md:px-12">
        <section className="space-y-6 rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="space-y-2">
            <p className="text-sm font-medium text-[var(--muted-foreground)]">Profile initials API</p>
            <h2 className="text-3xl font-semibold">Generate avatars on demand</h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              Serve a personalized SVG avatar based on the name and your chosen background color.
            </p>
          </div>

          <div className="grid gap-4">
            <label className="space-y-2 text-sm font-medium">
              Full name
              <Input value={nameInput} onChange={(event) => setNameInput(event.target.value)} />
            </label>
            <label className="space-y-2 text-sm font-medium">
              Background color
              <div className="flex gap-3">
                <Input
                  type="color"
                  value={backgroundInput}
                  onChange={(event) => setBackgroundInput(event.target.value)}
                  className="h-11 w-16 p-1"
                />
                <Input
                  value={backgroundInput}
                  onChange={(event) => setBackgroundInput(event.target.value)}
                  placeholder="#B6E3F9"
                />
              </div>
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => {
                setName(nameInput.trim() || SAMPLE_NAME);
                setBackground(backgroundInput.trim() || DEFAULT_BACKGROUND);
              }}
            >
              <UserCircle2 size={16} />
              Generate avatar
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigator.clipboard.writeText(window.location.origin + avatarUrl)}
            >
              <ShieldCheck size={16} />
              Copy API URL
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.open(avatarUrl, '_blank', 'noopener,noreferrer')}
            >
              <ImageIcon size={16} />
              Preview SVG
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.open(avatarUrl + '&download=1', '_blank', 'noopener,noreferrer')}
            >
              <Download size={16} />
              Download
            </Button>
          </div>

          <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--muted)] p-4 text-sm text-[var(--muted-foreground)]">
            <p className="font-medium text-[var(--foreground)]">Example request</p>
            <code className="mt-2 block break-all rounded-2xl bg-[var(--surface)] p-3 text-xs text-[var(--foreground)]">
              {avatarUrl}
            </code>
          </div>
        </section>

        <section className="flex flex-col gap-6 rounded-[32px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--muted-foreground)]">Live preview</p>
              <h3 className="text-2xl font-semibold">{initials}</h3>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-[var(--muted)] px-3 py-2 text-xs text-[var(--muted-foreground)]">
              <ShieldCheck size={14} />
              128 × 128
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--muted)] p-8">
            <img
              src={avatarUrl}
              alt={`Avatar for ${name}`}
              className="h-48 w-48 rounded-[28px] border border-[var(--border)] bg-white shadow-sm"
            />
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-[var(--muted)] p-4 text-sm text-[var(--muted-foreground)]">
            <p className="font-medium text-[var(--foreground)]">API parameters</p>
            <ul className="mt-2 space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--primary)]" />
                <span>
                  <strong>name</strong>: Full name used to compute initials.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span>
                  <strong>background</strong>: Hex color (ex: #B6E3F9).
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
