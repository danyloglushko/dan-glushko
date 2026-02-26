
# Rebuild Crimea SVG with Geographic Accuracy

## Problem Diagnosis

The current `CrimeaMapSVG.tsx` renders an amorphous blob that does not resemble the Crimean Peninsula. The hand-approximated SVG path coordinates produce a rounded, potato-like shape instead of Crimea's distinctive features:

- The **rhombus/diamond** overall shape is missing
- The **Kerch Peninsula** (narrow eastern extension) is barely visible
- The **Perekop Isthmus** (narrow northern neck connecting to mainland) is absent
- The **southwest coast indentation** around Sevastopol's harbor bays is not represented
- The **southern mountain coastline** (jagged, running through Yalta) is too smooth
- The **Karkinit Bay** (large northwest indentation) is missing

## Solution: Coordinate-Projected Approach

Instead of hand-drawing SVG paths (which has failed twice), we will use **real geographic coordinates** for Crimea's coastline and project them mathematically into SVG space.

### Technical Approach

1. **Define ~80-100 real lat/lon coordinate pairs** tracing Crimea's coastline, sourced from geographic references (bounding box: 32.48E-36.65E longitude, 44.39N-46.23N latitude)

2. **Apply equirectangular projection** in the component:
   - `x = (lon - minLon) * scaleX`
   - `y = (maxLat - lat) * scaleY` (inverted because SVG y-axis goes down)
   - Scale to fit a ~500x340 viewBox

3. **Generate the SVG path** from projected coordinates at render time

4. **Key geographic features to capture accurately:**
   - Perekop Isthmus (narrow ~5mi connection at north)
   - Karkinit Bay (large indentation on northwest)
   - Western coast past Yevpatoriya
   - Kalamita Bay and Sevastopol harbor indentation (southwest)
   - Cape Sarych (southernmost point, ~44.39N)
   - Southern mountain coast through Yalta, Alushta (jagged)
   - Feodosia Bay
   - Kerch Peninsula (narrow finger extending east to ~36.6E)
   - Kazantip Bay (north side of Kerch)
   - Arabat Spit indication (long sandbar on northeast)

### Files to Modify

**`src/components/CrimeaMapSVG.tsx`** -- Complete rewrite:
- Replace the hardcoded path string with an array of `[longitude, latitude]` coordinate pairs
- Add a `project()` function that converts geo coordinates to SVG x/y
- Generate the path `d` attribute from projected points
- Keep all existing visual styling: 1.4px gold stroke, no fill, coordinate grid, topographic contours, Sevastopol marker with pulse, city labels, coordinate labels, scroll-triggered draw animation
- The viewBox will be adjusted to fit the properly projected shape

**`src/pages/Index.tsx`** -- No changes needed (layout already positions map to the right of Chapter I text in a two-column grid)

### Visual Elements Preserved
- Stroke-only outline (1.4px gold, no fill)
- Faint coordinate grid (33E-36E, 44.3N-46.2N)
- Subtle topographic contour ellipses at low opacity
- Sevastopol marker with pulse rings and coordinate label
- City labels (Perekop, Kerch, Yalta, Karkinit Bay)
- Scroll-triggered stroke-dashoffset draw animation
- All existing color values and animation timings

### Expected Result
The map will accurately show Crimea's distinctive shape: the narrow Perekop neck at top, the broad diamond body, the Kerch finger extending east, the jagged southern coastline, and Sevastopol's harbor indentation on the southwest -- matching the reference images provided.
