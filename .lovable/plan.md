
# Rebuild Crimea Map Using Real Wikimedia Commons SVG Path Data

## Problem
The current hand-approximated coordinate arrays produce an inaccurate blob shape. Multiple attempts to manually define coastline points have failed to capture Crimea's true outline. We need real cartographic data.

## Solution
Use the **actual SVG path** from the Wikimedia Commons file `Outline_Map_of_Crimea.svg` — a cartographically accurate outline created with proper geographic tools (Inkscape + Natural Earth data). This path contains the real coastline with all the correct indentations, peninsulas, and bays.

### Approach

**Instead of hand-coding lat/lon coordinates**, we will embed the real SVG path `d` attribute directly from the Wikimedia source. This path is already in SVG coordinate space (1000x678 viewBox) and accurately represents:
- The Perekop Isthmus (narrow northern neck)
- Karkinit Bay (large NW indentation)
- Cape Tarkhankut (NW tip)
- Sevastopol harbor area (bottom-left extremity)
- Cape Sarych (southernmost point)
- Southern mountain coast (through Yalta)
- Feodosia Bay
- Kerch Peninsula (eastern finger)
- Arabat Spit area

### Technical Details

**File: `src/components/CrimeaMapSVG.tsx`** -- Complete rewrite:

1. Replace the `COASTLINE` coordinate array and `project()` function with the raw SVG path `d` attribute extracted from `path3978` in the Wikimedia SVG
2. Set the viewBox to match the source: approximately `0 0 1000 678` (or a cropped version focusing on the coastline)
3. Transform/scale the path to fit our desired display size while maintaining proportions
4. Position Sevastopol marker using the known SVG coordinates -- since the map uses a conformal projection with edges `top=46.3, bottom=44.2, left=32.4, right=36.8`, we can calculate Sevastopol's position (33.52E, 44.62N) as approximately `x=254, y=537` in the 1000x678 space
5. Keep all existing visual styling: 1.4px gold stroke, no fill, coordinate grid overlay, Sevastopol pulsed marker with label, city dots, scroll-triggered `stroke-dashoffset` draw animation
6. Remove city labels that clutter (keep only Sevastopol as the primary marker with coordinates)

**File: `src/pages/Index.tsx`** -- No changes needed (layout already correct)

### Why This Will Work
- The path data is from an actual cartographic source, not hand-approximated
- It uses hundreds of precise coordinate points vs our ~90 guessed ones
- The Wikimedia file uses conformal projection with documented edge parameters matching our existing bounding box
- This is the same approach professional map visualizations use -- extract path data from verified geographic sources
