# Card Color Update - Pink-Spectrum Neon Palette

## Summary

Updated the card/box component colors on both the landing page and dashboard to use a cohesive pink-spectrum neon palette tied to the brand pink (#FF3DA5).

## Files Modified

### 1. `src/app/globals.css`

#### Changes Made:

**A. Updated Base Background Color**
```diff
- --background: #0a0a0a;
+ --background: #0B0B10;
```

**B. Updated Brand Pink Accent**
```diff
- --accent: #f8518a;
- --accentCTA: #f8518a;
- --accentPressed: #d63d6f;
- --accentSoft: rgba(248, 81, 138, 0.15);
- --accentBorderSoft: rgba(248, 81, 138, 0.3);
+ --accent: #FF3DA5;
+ --accentCTA: #FF3DA5;
+ --accentPressed: #E03590;
+ --accentSoft: rgba(255,61,165,0.15);
+ --accentBorderSoft: rgba(255,61,165,0.3);
```

**C. Updated Neon Card Palette**

Replaced the existing neon card gradients with the new pink-spectrum palette:

**Card Variant A (Pink -> Fuchsia) - `neon-card-rose`**
```diff
- --neon-rose-bg: linear-gradient(135deg, rgba(255, 36, 145, 0.30), rgba(60, 10, 35, 0.82));
- --neon-rose-border: rgba(255, 36, 145, 0.55);
- --neon-rose-glow: 0 0 0 1px rgba(255, 36, 145, 0.22), 0 18px 45px rgba(255, 36, 145, 0.18);
+ --neon-rose-bg: linear-gradient(135deg, rgba(255,61,165,0.20) 0%, rgba(255,79,216,0.14) 45%, rgba(11,11,16,0.0) 100%);
+ --neon-rose-border: rgba(255,61,165,0.45);
+ --neon-rose-glow: 0 0 32px rgba(255,61,165,0.18);
```

**Card Variant B (Fuchsia -> Purple) - `neon-card-violet`**
```diff
- --neon-violet-bg: linear-gradient(135deg, rgba(168, 85, 247, 0.34), rgba(28, 10, 55, 0.84));
- --neon-violet-border: rgba(168, 85, 247, 0.55);
- --neon-violet-glow: 0 0 0 1px rgba(168, 85, 247, 0.20), 0 18px 45px rgba(168, 85, 247, 0.16);
+ --neon-violet-bg: linear-gradient(135deg, rgba(255,79,216,0.18) 0%, rgba(138,63,252,0.14) 50%, rgba(11,11,16,0.0) 100%);
+ --neon-violet-border: rgba(255,79,216,0.40);
+ --neon-violet-glow: 0 0 32px rgba(255,79,216,0.16);
```

**Card Variant C (Purple -> Indigo) - `neon-card-blue`**
```diff
- --neon-blue-bg: linear-gradient(135deg, rgba(59, 130, 246, 0.34), rgba(8, 18, 45, 0.86));
- --neon-blue-border: rgba(59, 130, 246, 0.52);
- --neon-blue-glow: 0 0 0 1px rgba(59, 130, 246, 0.18), 0 18px 45px rgba(59, 130, 246, 0.14);
+ --neon-blue-bg: linear-gradient(135deg, rgba(138,63,252,0.18) 0%, rgba(59,91,255,0.13) 55%, rgba(11,11,16,0.0) 100%);
+ --neon-blue-border: rgba(138,63,252,0.40);
+ --neon-blue-glow: 0 0 32px rgba(138,63,252,0.16);
```

**Card Variant D (Indigo -> Cyan) - `neon-card-teal`**
```diff
- --neon-teal-bg: linear-gradient(135deg, rgba(34, 211, 238, 0.30), rgba(6, 35, 40, 0.86));
- --neon-teal-border: rgba(34, 211, 238, 0.50);
- --neon-teal-glow: 0 0 0 1px rgba(34, 211, 238, 0.16), 0 18px 45px rgba(34, 211, 238, 0.12);
+ --neon-teal-bg: linear-gradient(135deg, rgba(59,91,255,0.16) 0%, rgba(0,212,255,0.12) 55%, rgba(11,11,16,0.0) 100%);
+ --neon-teal-border: rgba(0,212,255,0.36);
+ --neon-teal-glow: 0 0 32px rgba(0,212,255,0.14);
```

**Card Variant E (Cyan -> Mint) - `neon-card-fuchsia`**
```diff
- --neon-fuchsia-bg: linear-gradient(135deg, rgba(255, 0, 102, 0.32), rgba(55, 8, 22, 0.88));
- --neon-fuchsia-border: rgba(255, 0, 102, 0.55);
- --neon-fuchsia-glow: 0 0 0 1px rgba(255, 0, 102, 0.18), 0 18px 45px rgba(255, 0, 102, 0.14);
+ --neon-fuchsia-bg: linear-gradient(135deg, rgba(0,212,255,0.14) 0%, rgba(27,255,184,0.10) 60%, rgba(11,11,16,0.0) 100%);
+ --neon-fuchsia-border: rgba(27,255,184,0.32);
+ --neon-fuchsia-glow: 0 0 32px rgba(27,255,184,0.12);
```

## Color System

### Palette Colors
- **Pink (Brand)**: #FF3DA5
- **Fuchsia**: #FF4FD8
- **Purple**: #8A3FFC
- **Indigo**: #3B5BFF
- **Cyan**: #00D4FF
- **Mint**: #1BFFB8

### Card Mapping

| Variant | CSS Class | Gradient | Used By |
|---------|-----------|----------|---------|
| A | `neon-card-rose` | Pink → Fuchsia | Landing card 1, PastelTile "cream" |
| B | `neon-card-violet` | Fuchsia → Purple | Landing card 2, PastelTile "pink" |
| C | `neon-card-blue` | Purple → Indigo | Landing card 3, PastelTile "lavender" |
| D | `neon-card-teal` | Indigo → Cyan | Landing card 4, PastelTile "mint" |
| E | `neon-card-fuchsia` | Cyan → Mint | Landing card 5, PastelTile "ice" |

## Implementation Details

### Cohesion with Brand Pink
- All gradients start from or include colors adjacent to pink in the spectrum
- Variant A directly uses brand pink (#FF3DA5) as its primary hue
- The progression (pink → fuchsia → purple → indigo → cyan → mint) creates a cohesive visual system
- All cards maintain consistent gradient direction (135deg) and intensity (10-25% opacity)

### Readibility
- Card backgrounds use subtle gradients (10-20% opacity) that fade to transparent
- Text remains white (`--text: #ffffff`) for high contrast
- Icon containers use `bg-white/10` for subtle differentiation
- Border opacity (32-45%) provides definition without overwhelming the content
- Glow effects are soft (32px spread, 12-18% opacity) and don't interfere with text

### Performance
- Used CSS variables for all card styles (single source of truth)
- Glow effects use `box-shadow` instead of `filter: blur()` for better performance
- Gradients are defined once in CSS and reused via classes
- No heavy inline styles or JavaScript calculations

### Consistency
- Both landing page and dashboard use the same `PastelTile` component
- Component maps variant names to CSS classes consistently
- All cards share:
  - Same rounding (`rounded-3xl`)
  - Same padding (`p-6` or `p-5` from component)
  - Same shadow style (via CSS classes)
  - Same hover behavior (scale transform)

## Testing

To verify the changes:
1. Run `npm run dev`
2. Visit http://localhost:3000
3. Check the "DonLeo Modes" section on the landing page
4. Navigate to dashboard pages (e.g., /app/wingman, /app/rizz)
5. Verify all cards display with the new pink-spectrum gradients
6. Check that text remains readable against the new backgrounds
7. Verify hover states work correctly

## Notes

- No changes were made to typography, spacing, layout, or other UI elements
- Only color values were updated in the CSS
- The component structure and variant mapping remain unchanged
- All existing functionality is preserved
