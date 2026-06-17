## Resumen del Proyecto: Portfolio de Tomás (Junio 2025)

### Tecnologías Utilizadas

- **Next.js** (App Router)
- **React.js** con JavaScript
- **Tailwind CSS**
- **shadcn/ui** (componentes)
- **Web Animations API** (animaciones fade-up)
- **react-icons** (iconos de tecnologías)


---

### Estructura de Archivos

```plaintext
app/
├── page.tsx              # Página principal (SPA)
├── layout.tsx            # Layout con ThemeProvider y fuentes
├── globals.css           # Estilos globales y variables de tema

components/
├── navbar.tsx            # Navegación sticky con smooth scroll
├── hero.tsx              # Sección hero con imagen y botón descarga CV
├── about-me.tsx          # Sección sobre mí con carrusel de iconos
├── IconCarousel.tsx      # Carrusel animado de tecnologías
├── CertificationCarousel.tsx  # Carrusel de certificaciones
├── projects.tsx          # Sección de proyectos (3 subsecciones)
├── learning-path.tsx     # Timeline vertical de formación
├── experience.tsx        # Timeline vertical de experiencia laboral
├── contact.tsx           # Formulario de contacto
├── theme-provider.tsx    # Proveedor de tema claro/oscuro
└── theme-toggle.tsx      # Botón toggle de tema

lib/
├── animations.ts         # Funciones de animación (Intersection Observer)
└── smoothScroll.ts       # Función de scroll suave

public/
├── background-dark.png   # Fondo topográfico tema oscuro
└── background-light.png  # Fondo topográfico tema claro
```

---

### Secciones del Portfolio

| # | Sección | Descripción
|-----|-----|-----
| - | **Navbar** | Navegación fija con enlaces a secciones y toggle de tema
| 1 | **Hero** | Presentación con nombre, título, redes sociales y botón de descarga de CV
| 2 | **About Me** | Descripción personal + carrusel infinito de iconos de tecnologías
| 3 | **Certifications** | Carrusel de badges/certificaciones con enlaces a Credly
| 4 | **Projects** | Tres subsecciones: WordPress, React Frameworks, Mini-proyectos
| 5 | **Learning Path** | Timeline vertical de formación académica
| 6 | **Experience** | Timeline vertical de experiencia laboral
| 7 | **Contact** | Formulario de contacto (preparado para integrar con servicio externo)


---

### Funcionalidades Implementadas

1. **Tema Claro/Oscuro** - Toggle con persistencia, fondos SVG dinámicos
2. **Animaciones Fade-Up** - Elementos se animan al entrar en viewport (Intersection Observer)
3. **Smooth Scroll** - Navegación suave entre secciones
4. **Carruseles Animados** - Iconos de tecnologías y certificaciones con animación infinita
5. **Carrusel de Imágenes** - En proyectos WordPress/React con navegación manual
6. **Responsive Design** - Adaptación a móvil (layouts verticales en carruseles/timelines)
7. **Descarga de CV** - Botón que descarga PDF del currículum


---

### Pendiente de Configurar

- **Formulario de contacto**: Requiere integración con servicio externo (Formspree, Getform, etc.) para recibir emails
