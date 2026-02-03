# Pastel Profile Studio

Create pastel, initials-based profile avatars with a gentle light/dark interface and a simple SVG API.

## Overview
Pastel Profile Studio is a Next.js + Tailwind CSS (v4) web app that generates personalized profile images from a name. It supports light/dark mode, pastel (no-gradient) color palettes, and gender-aware color selection for boy/girl.

## Features
- **Pastel UI** with light and dark themes
- **Initials-based avatars** generated from full names (e.g., "Shubham Giri" → **SG**)
- **Gender-aware palettes** (`boy` | `girl`)
- **Instant SVG API** for download or inline use
- **Shadcn-inspired UI** with icon-based controls

## Tech Stack
- **Next.js (App Router)**
- **Tailwind CSS v4**
- **TypeScript**
- **Lucide Icons**

## Quick Start
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

## API Usage
### Endpoint
```
GET /api/avatar?name=Shubham%20Giri&gender=boy
```

### Query Parameters
| parameter | description | example |
| --- | --- | --- |
| `name` | Full name used to compute initials | `Shubham Giri` |
| `gender` | Palette choice (`boy` or `girl`) | `girl` |
| `download` | Adds `Content-Disposition: attachment` | `1` |

### Example
```bash
curl "http://localhost:3000/api/avatar?name=Shubham%20Giri&gender=boy"
```

## Project Structure
```
app/
  api/avatar/route.ts     # SVG avatar API
  layout.tsx              # App shell
  page.tsx                # UI
components/
  theme-toggle.tsx        # Light/dark mode
  ui/                     # Shadcn-style primitives
lib/utils.ts              # Utility helper
```

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Create production build
- `npm run start` — Start production server
- `npm run lint` — Run lint checks

## Notes
- The SVG avatar is deterministic for a given name and gender.
- The API returns a 256×256 rounded-square avatar.

## License
MIT
