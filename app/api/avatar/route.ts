import { NextRequest } from 'next/server';

const DEFAULT_PALETTE = [
  '#CFE6F7',
  '#B6E3F9',
  '#D3F0EA',
  '#E2E8F0',
  '#F8C7DA',
  '#F2B8D1',
  '#F9D6C1',
  '#FBE1EC'
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase());
  return letters.join('') || 'SG';
}

function pickColor(name: string) {
  const palette = DEFAULT_PALETTE;
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % palette.length;
  return palette[index];
}

function normalizeHexColor(color: string | null) {
  if (!color) {
    return null;
  }
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color.trim()) ? color.trim() : null;
}

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || 'Shubham Giri';
  const backgroundParam = normalizeHexColor(searchParams.get('background'));
  const download = searchParams.get('download');
  const initials = getInitials(name);
  const background = backgroundParam ?? pickColor(name);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="48" fill="${background}" />
  <rect x="12" y="12" width="232" height="232" rx="42" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="6" />
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" font-family="'Inter', 'Segoe UI', sans-serif" font-size="96" font-weight="600" fill="#2c2a33">${initials}</text>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Content-Disposition': download ? `attachment; filename="${initials}.svg"` : 'inline'
    }
  });
}
