# Auditoría 1 — Estructura, código limpio y buenas prácticas

Fecha: 2026-06-03  
Rama de investigación: diagnóstico sobre `main` (sin cambios).  
Método: grep de imports, análisis de next.config, build con TS/ESLint strict.

---

## Hallazgo 1 — Dead Code en components/ui/

### Componentes sin usar: 35 de 50 (70% de ruido)

**Componentes utilizados (15 total):**  
badge, button, card, dialog, FullScreenProjectModal, input, label, separator, sheet, skeleton, textarea, toast, toaster, toggle, tooltip.

**Componentes no utilizados (35 total):**  
accordion, alert, alert-dialog, aspect-ratio, avatar, breadcrumb, calendar, carousel, chart, checkbox, collapsible, command, context-menu, drawer, dropdown-menu, form, hover-card, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, sidebar, switch, table, tabs, use-mobile (el del ui/).

### Impacto

- Inflación de la carpeta `components/ui/` (+22 archivos innecesarios).
- Confusión al desarrollar (¿esto se usa?).
- Artificio de v0.dev: cuando scaffoldea, siempre genera el set completo de shadcn/ui, aunque el proyecto use solo una fracción.

### Ticket derivado

**`refactor/remove-dead-code`** — Borrar los 35 componentes no usados.

---

## Hallazgo 2 — Duplicación de hooks

### `use-mobile.tsx` existe en DOS lugares

- `hooks/use-mobile.tsx`
- `components/ui/use-mobile.tsx`

Además:
- `hooks/use-toast.ts` (sin duplicado en ui/)
- Estos archivos (`use-mobile`, `use-toast`) son **custom hooks**, no shadcn/ui, así que no deberían estar en `components/ui/`.

### Impacto

- Inconsistencia de ubicación: ¿dónde cargos están los hooks propios?
- Riesgo de importar desde el lugar equivocado.
- La ubicación "correcta" es `hooks/`.

### Ticket derivado

**`refactor/remove-dead-code`** — Borrar `components/ui/use-mobile.tsx` (mantener solo `hooks/use-mobile.tsx`).

---

## Hallazgo 3 — Flags de next.config.mjs

### 3a. `experimental.appDir: true` — OBSOLETO

En Next 15, `appDir` es estable y default. El flag `experimental.appDir` ya no existe.

**Estado actual:**
```
⚠ Invalid next.config.mjs options detected: 
⚠     Unrecognized key(s) in object: 'appDir' at "experimental"
```

**Impacto:** Warning en cada build. No rompe, pero es ruido.

### 3b. `distDir: 'out'` — REDUNDANTE (pero inofensivo)

Con `output: 'export'`, Next automáticamente usa `/out`. El `distDir` es para SSR. Se puede remover sin efecto.

### 3c. `ignoreDuringBuilds: true` y `ignoreBuildErrors: true` — PROBLEMÁTICOS

Estos flags esconden errores **de verdad**.

**Resultado:** El build "pasa" aunque hay errores TS/ESLint que saldrían a la luz si se activan los checks.

### Ticket derivado

**`chore/clean-next-config`** — Remover `experimental.appDir` y `distDir: 'out'`. Dejar (por ahora) `ignoreDuringBuilds` e `ignoreBuildErrors` para pasar a ticket separado (ver Hallazgo 4).

---

## Hallazgo 4 — TypeScript Errors escondidos

### Al activar `typescript.ignoreBuildErrors: false`

Build rompe con error TS:

```
Type error: ./app/[locale]/layout.tsx:29:24
Type '{ children: Element; attribute: string; defaultTheme: string; enableSystem: true; }' 
is not assignable to type 'IntrinsicAttributes & { children: ReactNode; }'.
  Property 'attribute' does not exist on type 'IntrinsicAttributes & { children: ReactNode; }'.
```

**Root cause:**

- **`components/theme-provider.tsx`** es un wrapper que acepta **solo `{ children }`**.
- **`app/[locale]/layout.tsx` línea 29** intenta pasar `attribute="class"`, `defaultTheme="system"`, `enableSystem` al wrapper.
- El wrapper no expone esos props (los pasa internamente a `NextThemesProvider`, pero no al componente exportado).

**Solución:** El wrapper debe aceptar y pasar esos props:

```typescript
export function ThemeProvider({ 
  children, 
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true 
}: { 
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
}) {
  // ...
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
```

### Ticket derivado

**`chore/enable-strict-builds`** — 
1. Activar `typescript.ignoreBuildErrors: false`.
2. Arreglar el `ThemeProvider` wrapper para exponer props.
3. Verificar que no haya más errores TS.
4. Lo mismo para ESLint si hay offensas.

---

## Hallazgo 5 — Dependencias sin pinear

(Ya identificado en baseline, pero se confirma acá.)

```json
"next-themes": "latest"
"react-icons": "latest"
```

Estas dependencias **sin versión pineada** pueden causar instalaciones inconsistentes (local vs CI). Ya rompieron el build local antes (react-icons versión más nueva ≠ versión del package-lock).

### Ticket derivado

**`chore/pin-dependencies`** — Fijar versiones de `next-themes` y `react-icons` al package-lock actual (ej. `"next-themes": "^0.2.1"`, `"react-icons": "^4.12.0"`, o las versiones en package-lock).

---

## Resumen de tickets derivados

| Ticket | Alcance | Severidad |
|---|---|---|
| `refactor/remove-dead-code` | Borrar 35 UI + duplicado use-mobile | Media |
| `chore/clean-next-config` | Remover experimental.appDir, distDir | Baja |
| `chore/pin-dependencies` | Pinear next-themes, react-icons | Alta |
| `chore/enable-strict-builds` | Activar TS/ESLint strict + fijar ThemeProvider | Alta |

---

## Próximos pasos

Decidir cuáles tickets entran en este sprint y cómo fragmentarlos en ramas atómicas.  
Recomendación: **orden de ejecución:**

1. `chore/pin-dependencies` — bajo riesgo, alto valor (evita future drift).
2. `chore/clean-next-config` — bajo riesgo, bajo esfuerzo.
3. `chore/enable-strict-builds` — alto riesgo, requiere cuidado (pero es "la verdad").
4. `refactor/remove-dead-code` — medio riesgo, medio esfuerzo.
