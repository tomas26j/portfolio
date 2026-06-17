# Auditoría 2 — Optimización (static export)

Fecha: 2026-06-03  
Contexto: Portfolio estático (GitHub Pages, `output: 'export'`). No hay SSR/ISR ni Image Optimization API en runtime.

---

## Hallazgo 1 — Assets estáticos: peso y composición

### Estadísticas

| Métrica | Valor | Nota |
|---|---|---|
| **Total `public/`** | 29 MB | Todos los assets |
| **Imágenes** | 53 files | Todas PNG/JPG (cero WebP) |
| **Formatos** | PNG, JPG | Sin optimización web-native |

### Top 10 offensores (imágenes)

| Archivo | Tamaño | Proyecto | Estado |
|---|---|---|---|
| New Project-4.png | 3.8 MB | ??? | ⚠️ **COMENTADO** (dead asset) |
| cancun-com-ar_00.png | 2.7 MB | Cancun | Activo (modal) |
| sacabollos-quintana_1.png | 1.7 MB | Sacabollos | Activo (modal) |
| Burbank-Detox-Center_2.png | 1.7 MB | Burbank | Activo (modal) |
| playamarlin_1.png | 1.5 MB | Playa Marín | Activo (modal) |
| cancun-com-ar_2.png | 1.4 MB | Cancun | Activo (modal) |
| playamarlin_3.png | 1.3 MB | Playa Marín | Activo (modal) |
| cancun-com-ar_0.png | 1.0 MB | Cancun | Activo (modal) |
| image.png | 965 KB | Hero | **Critical path** (loaded immediately) |
| cancun-com-ar_1.png | 928 KB | Cancun | Activo (modal) |

---

## Hallazgo 2 — Dead assets (imágenes sin uso)

### `New Project-4.png` (3.8 MB)

- Ubicación: `public/New Project-4.png`
- Referencia: `components/hero.tsx` línea ~??
- Estado: **Commentado** (`//src={getStaticPath("/New Project-4.png")}`)
- Impacto: **+3.8 MB de waste** (aunque no se sirve, existe en repo y en build output)

**Recomendación:** Borrar.

---

## Hallazgo 3 — Imágenes en critical path vs. lazy-loaded

### Critical path (cargadas al viewport inicial)

- **`/image.png`** (965 KB) en `<Hero>` — imagen de presentación personal.

### Lazy-loaded (en modales/carouseles)

- **Todas las imágenes de proyectos** (~25 imágenes, total ~15 MB):
  - Cancun (5 imágenes, ~7 MB)
  - Playa Marín (6 imágenes, ~7 MB)
  - Sacabollos (3 imágenes, ~3 MB)
  - Burbank (4 imágenes, ~4 MB)
  - Ulpan (3 imágenes, ~1.5 MB)
  - BDA (4 imágenes, ~1 MB)

**Oportunidad:** Las imágenes de proyectos están en modales `FullScreenProjectModal`. **Cargan cuando el usuario abre el modal**, no en el critical path. Ideal para lazy-loading + compresión.

---

## Hallazgo 4 — Bundle JavaScript

### Routes & sizes (baseline)

```
Route (app)                                 Size  First Load JS
┌ ○ /                                      136 B         101 kB
├ ○ /_not-found                            977 B         102 kB
└ ● /[locale]                            32.9 kB         157 kB
+ First Load JS shared by all             101 kB
  ├ chunks/4bd1b696-*.js                  53.2 kB (shadcn/ui, forms, radix)
  ├ chunks/684-*.js                       45.5 kB (next-intl, animations)
```

**Composición:** 101 kB shared = 53.2 + 45.5 kB (dos chunks grandes).

**Con `output: 'export'` + `unoptimized: true`:**
- No hay Image Optimization API (Next.js no puede reoptimizar en build).
- No hay ISR (static build es todo o nada).
- Tree-shaking ya eliminó los componentes dead code (refactor realizado).

**Oportunidad:** Limitar es marginal aquí (ya sin dead code UI). El bundle actual es razonable para un portfolio estático (157 kB First Load JS es aceptable).

---

## Hallazgo 5 — Formatos de imagen y oportunidades de compresión

### Estado actual

- **53 imágenes**: 100% PNG/JPG.
- **Sin WebP**: pérdida de compresión moderna (típicamente 30-40% más pequeño).
- **Sin compresión lossy**: PNGs de fotografías son candidates para JPG (menor size).
- **Sin resizing**: imágenes se sirven a tamaño original (con `unoptimized: true`).

### Potencial de ahorro

| Estrategia | Estimado |
|---|---|
| **Convertir PNG→WebP** (con fallback JPG) | ~35% reducción (9 MB de 25 MB) |
| **Comprimir JPG** (quality 75-80%) | ~20-30% reducción |
| **Resize a max 1200px** (modales no necesitan 3840px) | ~50-60% reducción |
| **Lazy-load en modales** (load on demand) | ~0 byte initial, defer ~15 MB |
| **Delete `/New Project-4.png`** | -3.8 MB inmediato |

**Total potencial:** ~12-15 MB de ahorro (40-50% de 29 MB).

---

## Hallazgo 6 — Lighthouse y Core Web Vitals

(No medido localmente, pero predicción basada en asset size):

| Métrica | Predicción | Impacto |
|---|---|---|
| **LCP** (Largest Contentful Paint) | ~2-3s | `image.png` en hero es LCP |
| **CLS** (Cumulative Layout Shift) | Bajo | Portfolio layout estable |
| **FID** (First Input Delay) | <100ms | JS es mínimo y bien optimizado |

**Blocker potencial:** LCP está probablemente en amarillo/rojo (>2.5s) debido al peso de `image.png` (965 KB) sin optimización.

---

## Tickets derivados

### Alto impacto, bajo esfuerzo:

1. **`perf/delete-dead-assets`** — Borrar `New Project-4.png` (-3.8 MB).
2. **`perf/optimize-images`** — Convertir a WebP, comprimir JPG, resize a max 1200px.

### Medio impacto, medio esfuerzo:

3. **`perf/lazy-load-project-images`** — Imágenes en modales cargan on-demand via Next.js `dynamic()`.

### Bajo impacto técnico (pero valor UX):

4. **`perf/improve-lcp`** — Optimizar hero image (compresión, WebP, quizás reducir tamaño para hero use-case).

---

## Recomendación de orden

```
1. perf/delete-dead-assets (quick win, -3.8 MB)
2. perf/optimize-images (mejor ROI: -9 MB potencial)
3. perf/lazy-load-project-images (defer 15 MB, mejora LCP)
4. perf/improve-lcp (fine-tuning, Lighthouse green)
```

Estos 4 tickets podrían reducir **initial page load de 29 MB → ~10-12 MB** (60% reduction).

---

## Notas técnicas

- **GitHub Pages**: CDN no hace compresión automática. Los assets se sirven tal cual (gzip en tránsito, pero no transformación de imagen).
- **`unoptimized: true` en Next.js**: Desactiva Image Optimization, así que no hay benefit de usar `<Image>` vs `<img>` en este proyecto.
- **Migraciones futuras**: Si alguna vez pasa a Vercel, el Image Optimization API automatic haría mucho de esto.
