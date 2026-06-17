# Análisis detallado: Dead Code en components/ui/

## Contexto

El portfolio es **estático** (GitHub Pages, `output: 'export'`). No hay servidor, rutas dinámicas, o interactividad backend. Esto es crítico: la mayoría de componentes complejos de shadcn/ui (tablas, formularios avanzados, etc.) son **genuinamente innecesarios** para este caso de uso.

**Preguntas clave:**
- ¿Agregará el usuario un blog? Improbable (tiene Vault en obsidian).
- ¿Un panel administrativo? No (GitHub Pages no lo permite).
- ¿Formularios complejos? Ya tiene uno básico (contacto).
- ¿Listas ordenables/paginadas? No hay contenido dinámico.

---

## Categorización de los 35 componentes muertos

### CATEGORÍA A — "Ruido puro" (borrar sin dudas)

Estos **NUNCA** tendrían sentido en un portfolio estático:

| Componente | Razón | Impacto de borrar |
|---|---|---|
| **accordion** | Expandibles (UI interactiva avanzada) | Alto — archivo grande, nunca usado |
| **alert-dialog** | Diálogos de confirmación (interactividad) | Bajo — alias de `dialog` |
| **avatar** | Imágenes de usuario (perfil/equipo) | Bajo — cosmético |
| **breadcrumb** | Navegación secundaria | Bajo — el portfolio usa scrolling suave |
| **calendar** | Selector de fechas | Alto — innecesario en portfolio estático |
| **carousel** (extra) | Rotador de imágenes (ya hay modales) | Medio — hay rotadores propios |
| **chart** | Gráficos de datos (Recharts) | Alto — para dashboards, no portfolio |
| **checkbox** | Input checkbox (formularios) | Bajo — el portfolio no tiene forms complejos |
| **collapsible** | Toggleable sections | Bajo — función marginal |
| **command** | Command palette / search | Medio — podría ser útil para buscar proyectos, pero no está en scope |
| **context-menu** | Click derecho (muy raro en web) | Bajo — innecesario |
| **dropdown-menu** | Menú desplegable | **Potencialmente útil** — podría usarse en navbar o filtros |
| **drawer** | Menú lateral deslizable | Bajo — el portfolio usa sheet + sidebar |
| **form** | Wrapper de formularios (react-hook-form) | Bajo — contacto es simple |
| **hover-card** | Tooltips con contenido (hover) | Bajo — decorativo |
| **menubar** | Barra de menú macOS | Alto — innecesario en portfolio |
| **navigation-menu** | Menú de navegación (como Figma) | Alto — el portfolio usa navbar simple |
| **pagination** | Números de página | Alto — sin contenido paginado |
| **popover** | Popup genérico | **Potencialmente útil** — para tooltips avanzados |
| **progress** | Barra de progreso | Bajo — sin procesos largos |
| **radio-group** | Radio buttons | Bajo — formularios simple |
| **resizable** | Paneles redimensionables | Alto — UI avanzada (IDEs, etc) |
| **scroll-area** | Scrollbar customizado | Bajo — función marginal |
| **select** | Dropdown select | **Potencialmente útil** — filtros de proyectos |
| **sidebar** | Barra lateral (ya trackeada en `components/`) | ✓ **USADO** |
| **switch** | Toggle on/off | Bajo — ya tenés theme-toggle |
| **table** | Tablas de datos | Alto — sin datos tabulares |
| **tabs** | Tabs/pestañas | **Potencialmente útil** — para secciones (skills, projects) |
| **use-mobile** (en ui/) | Hook de detección mobile | Duplicado (existe en hooks/) |

### CATEGORÍA B — "Potencialmente útil a futuro" (evaluar caso por caso)

Estos componentes **podrían** ser útiles en una evolución del portfolio:

| Componente | Caso de uso potencial | Probabilidad | Veredcito |
|---|---|---|---|
| **dropdown-menu** | Menú de acciones en proyectos o navbar | Media | **MANTENER** — bajo costo, usado en contextos reales de UI |
| **popover** | Tooltips avanzados con contenido | Baja | BORRAR — hover-card cubre 90% de casos |
| **select** | Filtros de proyectos (sector, tecnología) | Media | **MANTENER** — bajo costo, podría usarse en A2 (perf) |
| **tabs** | Organizar skills/certificaciones por categoría | Baja | MANTENER — archivo pequeño, uso futuro posible |

### CATEGORÍA C — "Críticos/Ya trackeados" (NO tocar)

✓ badge, button, card, dialog, input, label, separator, sheet, skeleton, textarea, toast, toaster, toggle, tooltip, FullScreenProjectModal.

---

## Recomendación final: qué borrar

**BORRAR SIN DUDAS (28 archivos):**  
accordion, alert, alert-dialog, aspect-ratio, breadcrumb, calendar, carousel (extra), chart, checkbox, collapsible, command, context-menu, drawer, form, hover-card, menubar, navigation-menu, pagination, progress, radio-group, resizable, scroll-area, switch, table, use-mobile (en ui/).

**MANTENER POR VALOR FUTURO (4 archivos):**  
dropdown-menu (UI patterns, navbar), select (filtros), tabs (organización), popover (tooltips avanzados).

> El costo de mantener estos 4 es mínimo (~5KB en el proyecto, cero impacto en producción porque no se importan).

---

## Beneficios realistas de la limpieza

### 1. **Build time** (medible)

- **Actual**: ~10-12s en dev mode (medible con `npm run build 2>&1 | grep -E "^Next.js|^Collecting|^Generating"`)
- **Esperado después**: marginal (quizás -0.5s), pero menos archivos = menos compilación TS.
- **Nota**: El impacto NO es en producción (tree-shaking ya elimina los no importados), es en DX (developer experience).

### 2. **Bundle size en producción** (CERO impacto)

Estos componentes **no están importados**, así que tree-shaking de webpack ya los elimina. El bundle final no cambia. **No hay beneficio de perf real aquí.**

### 3. **Cognitive load** (beneficio real pero intangible)

- Menos archivos = menos "¿uso esto?" al navegar código.
- Más claro cuáles son los componentes de verdad usados.
- Onboarding más rápido para futuros colaboradores.

### 4. **Tamaño de repo** (marginal)

- ~180KB de archivos fuente eliminados (pero git los sigue manteniendo en historial).
- Impacto real: casi cero.

---

## Plan de benchmarking (SI QUERÉS)

**Medir build time antes/después** es lo único que vale la pena:

```bash
# ANTES (con dead code)
time npm run build

# DESPUÉS (sin dead code)
time npm run build
```

Esperar diferencia de **0.5–2 segundos** (si es que hay). Si no hay cambio visible, es porque el impacto es minúsculo.

**No medir page load / Lighthouse**, porque el bundle no cambia (tree-shaking).

---

## Conclusión

**Borrar los 28 + mantener los 4 = limpieza inteligente.**

No cuesta casi nada mantener `dropdown-menu`, `select`, `tabs`, `popover`. Si el proyecto crece, ya están ahí. Si no, no pesan.

La limpieza es más por **sanidad mental** que por beneficio técnico. Y eso está bien — el código limpio es código que se mantiene.
