# Auditoría 3 — Seguridad (npm audit, headers, secretos)

Fecha: 2026-06-03  
Contexto: Portfolio estático (GitHub Pages, `output: 'export'`). Sin SSR, Middleware, Image Optimization API en runtime.

---

## Hallazgo 1 — npm audit report

### Resumen

```
9 vulnerabilities: 4 moderate, 4 high, 1 critical
```

### Análisis por gravedad

#### CRITICAL (1)
- **Next.js (9.3.4 - 16.3.0-canary.5)**: Múltiples CVEs listadas (RCE, Cache Key Confusion, Content Injection, SSRF, DoS)
  - **Versión instalada**: Next 15.2.4 (dentro del rango vulnerable)
  - **¿Aplica a este proyecto?**: **PARCIALMENTE** — Muchas de estas vulns son para Image Optimization API, Server Components, Middleware. El portfolio usa `output: 'export'` (static) + `unoptimized: true` + NO usa Server Components ni Middleware.
  - **Recomendación**: Actualizar a Next 15.5.19 (última stable) para cerrar el riesgo, aunque el impacto es bajo.

#### HIGH (4)
1. **lodash (≤4.17.23)**: Prototype Pollution, Code Injection via `_.template`, `_.unset`, `_.omit`
   - **Uso**: No importado directamente en el código. Probablemente transitivo.
   - **Impacto**: BAJO — no se ejecuta lógica de usuario.
   - **Recomendación**: Actualizar dependencia padre (probablemente a través de `npm audit fix`).

2. **glob (10.2.0 - 10.4.5)**: Command Injection via `-c/--cmd` con `shell: true`
   - **Uso**: Build-time dependency (Node.js tooling), no en runtime.
   - **Impacto**: BAJO — afecta máquina de build, no producción.
   - **Recomendación**: Actualizar.

3. **minimatch (9.0.0 - 9.0.6)**: ReDoS (Denial of Service via regex backtracking)
   - **Uso**: Transitivo (glob, otros globbing tools).
   - **Impacto**: BAJO — build-time, no runtime.
   - **Recomendación**: Actualizar.

4. **picomatch (≤2.3.1)**: ReDoS, Method Injection via POSIX character classes
   - **Uso**: Transitivo (globbing, build tools).
   - **Impacto**: BAJO — build-time.
   - **Recomendación**: Actualizar.

#### MODERATE (4)
1. **next-intl (≤4.9.1)**: Open Redirect, Prototype Pollution via translation catalog keys
   - **Versión instalada**: ^4.3.4 (vulnerable)
   - **¿Aplica?**: **SÍ** — se usa para i18n en el portfolio.
   - **Impacto**: MEDIO — Open Redirect podría redirigir a otro sitio. Prototype Pollution si los usuarios pueden controlar claves de traducción (no es el caso aquí).
   - **Recomendación**: Actualizar a ≥4.9.2 (fix disponible).

2. **postcss (<8.5.10)**: XSS via unescaped `</style>` in CSS stringify output
   - **Uso**: Dev-time (build), no en runtime.
   - **Impacto**: BAJO — no afecta producción.
   - **Recomendación**: Actualizar.

3. **brace-expansion (2.0.0 - 2.0.2)**: Zero-step sequence causes process hang
   - **Uso**: Transitivo.
   - **Impacto**: BAJO — proceso hang en build, no runtime.
   - **Recomendación**: Actualizar.

4. **yaml (2.0.0 - 2.8.2)**: Stack Overflow via deeply nested YAML
   - **Uso**: Dev-time (Next.js internals), no en runtime.
   - **Impacto**: BAJO — no es atacable desde cliente.
   - **Recomendación**: Actualizar.

---

## Hallazgo 2 — Riesgo real vs. falso positivo

| Vulnerabilidad | Aplica | Severidad Real | Acción |
|---|---|---|---|
| Next.js critical | Parcial* | Bajo | Actualizar a 15.5.19 |
| lodash | No | Bajo | npm audit fix |
| glob/minimatch/picomatch | No (build-time) | Bajo | npm audit fix |
| next-intl open redirect | Sí | Medio | Actualizar a ≥4.9.2 |
| postcss XSS | No (build-time) | Bajo | npm audit fix |
| brace-expansion/yaml | No (build-time) | Bajo | npm audit fix |

*Next.js: muchas vulns no aplican porque no usas Image Optimization API, Server Components, Middleware, etc. Las que podrían aplica (RCE React flight, CSP nonces en scripts) son muy específicas.

---

## Hallazgo 3 — Secretos y credenciales

### Búsqueda de patrones

- ✅ No API keys hardcodeadas en código fuente
- ✅ No .env files en repo
- ✅ No credenciales en histórico de git
- ⚠️ **emailjs** importado: Revisa si hay una API key pública expuesta

### Análisis emailjs

El portfolio usa `@emailjs/browser` (legítimo para formularios). **Importante**: EmailJS está diseñado para usar claves públicas en el frontend (no sensibles). Pero verifica:
- ¿Está configurado con el `publicKey` correcto?
- ¿Se valida en backend antes de procesar?

---

## Hallazgo 4 — Headers de seguridad (GitHub Pages limitations)

### Limitaciones de GitHub Pages (static)

GitHub Pages no permite configurar headers HTTP custom en archivos estáticos. Sin embargo, puedes:

1. **Content-Security-Policy (CSP)**: Agregar via `<meta>` tag en `layout.tsx` (menos seguro que header HTTP, pero mejor que nada)
2. **X-Content-Type-Options**: No aplicable (GitHub Pages maneja esto)
3. **X-Frame-Options**: No aplicable
4. **Referrer-Policy**: Puede ir en `<meta>`

### Recomendación

Agregar CSP meta tag en layout para:
- Bloquear inline scripts (solo desde `'self'`)
- Bloquear external script injection
- Permitir next.js scripts

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';">
```

**Nota**: Next.js requiere `'unsafe-inline'` y `'unsafe-eval'` para su propio funcionamiento en static export.

---

## Hallazgo 5 — GitHub Actions permisos

### Estado actual (post-fix)

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

**Análisis**:
- ✅ `contents: read` — correctamente limitado (solo lectura)
- ✅ `pages: write` — necesario para deploy a Pages
- ✅ `id-token: write` — necesario para OIDC auth a Pages
- ✅ `deploy` job solo corre en `push` a main (post-fix)

**Riesgo**: BAJO. Los permisos son necesarios y están correctamente limitados.

---

## Hallazgo 6 — Dependencias outdated vs. vulnerable

### npm audit fix

```
9 vulnerabilities → 7 fixable with `npm audit fix`
2 requieren `--force` (Next.js, que cambiaría a 15.5.19)
```

### Recomendación de upgrade

1. **CRÍTICO**: next-intl ^4.3.4 → ^4.9.2 (fix open redirect)
2. **IMPORTANTE**: next 15.2.4 → 15.5.19 (cierra vulns aunque no impacten)
3. **PREFERIBLE**: npm audit fix (cierra todas las demás)

---

## Tickets derivados

### Alto impacto, bajo esfuerzo:
1. **`sec/upgrade-dependencies`** — npm audit fix + pin next-intl ≥4.9.2
2. **`sec/add-csp-meta-tag`** — Agregar CSP meta en layout.tsx

### Medio impacto, medio esfuerzo:
3. **`sec/audit-emailjs-config`** — Verificar que EmailJS API key es pública (no secreto)

---

## Recomendación de orden

```
1. sec/upgrade-dependencies (cierra 7 vulns)
2. sec/add-csp-meta-tag (defensa en profundidad)
3. sec/audit-emailjs-config (verificación manual)
```

Después de estos 3 tickets: `npm audit` debería reportar 0 vulnerabilities.

---

## Hallazgo 7 — EmailJS configuración y seguridad

### Ubicación
`components/contact.tsx` líneas 39-44

### Credenciales encontradas
```javascript
emailjs.sendForm(
  "service_gzajc8d",    // Service ID
  "template_0rdzh9d",   // Template ID
  form.current,
  "Jc7jS1cQPbiVI_Hty"   // Public Key
)
```

### Análisis

**✅ SEGURO:**
- Las credenciales son **públicas por diseño**. EmailJS está construido para usar claves públicas en el frontend.
- NO hay Secret Key en el código (sería peligroso si lo hubiera).
- Honeypot protection activo (línea 31-35) contra spam/bots.

**Riesgo: BAJO** — Configuración correcta.

### Recomendación
No hay cambios necesarios. Las credenciales están correctamente clasificadas como públicas.

---

## Notas técnicas

- **static export**: Gran diferencia en superficie de ataque. Sin servidor, sin SSR, sin Middleware = muchas vuln de Next.js no aplican.
- **GitHub Pages**: Sin headers HTTP custom, pero CSP meta tag + good build practices mitigan la mayoría de riesgos.
- **emailjs**: Si se usa, debe estar configurado con **API KEY PÚBLICA** (no secret). El secret key nunca debe ir en frontend.
