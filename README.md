# PWA - Mejores Razas de Vacas

## Descripción
Aplicación Web Progresiva (PWA) sobre las mejores razas de vacas según Susana Pacheco Ortiz (22307026).

## Características Implementadas

###  Manifest Web App (manifest.webmanifest)
- Configuración completa para PWA
- Soporte para Display Browser con `display_override`
- Metadata de la aplicación (nombre, descripción, colores, orientación)
- Referencias a los 7 iconos en diferentes tamaños

###  Pack de Iconos + Favicon
- **7 tamaños de iconos PNG:**
  - 72x72px
  - 96x96px
  - 128x128px
  - 144x144px
  - 152x152px
  - 192x192px (maskable)
  - 512x512px (maskable)
- **favicon.ico** (32x32px)

###  Service Worker Adaptado
- Cache estático mejorado (versión v2)
- Incluye manifest y todos los iconos en el cache
- Estrategia Network First con fallback a cache
- Página offline personalizada
- Soporte para notificaciones push

###  Add to Home Screen (A2HS)
- Detección del evento `beforeinstallprompt`
- Botón de instalación personalizado
- Manejo de estados de instalación
- Detección de modo standalone
- Alertas informativas para el usuario

## Cómo Probar la PWA

### 1. Servidor Local
Asegúrate de tener XAMPP ejecutándose y accede a:
```
http://localhost/AWP/U1/SW4/
```

### 2. Verificar Service Worker
1. Abre las DevTools (F12)
2. Ve a la pestaña "Application" o "Aplicación"
3. En el menú lateral, selecciona "Service Workers"
4. Verifica que el SW esté registrado y activo

### 3. Verificar Manifest
1. En DevTools > Application > Manifest
2. Verifica que todos los campos estén correctos
3. Revisa que los iconos se carguen correctamente

### 4. Probar A2HS (Add to Home Screen)
1. El botón "Instalar Aplicación" aparecerá automáticamente si la PWA es instalable
2. Click en el botón para instalar
3. Acepta el prompt del navegador
4. La app se instalará en tu dispositivo/sistema

### 5. Probar Display Modes
La PWA soporta múltiples modos de visualización:
- `window-controls-overlay` (preferido)
- `standalone`
- `minimal-ui`
- `browser` (fallback)

### 6. Modo Offline
1. Instala la PWA
2. Ve a DevTools > Network
3. Marca la casilla "Offline"
4. Navega por la app - debería funcionar sin conexión
5. Intenta acceder a una página no cacheada - verás la página offline

### 7. Notificaciones
1. Click en "Solicitar Permiso de Notificaciones"
2. Acepta el permiso
3. Click en "Mostrar Notificación"
4. Deberías ver una notificación del sistema

## Estructura de Archivos

```
SW4/
├── icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   └── icon-512x512.png
├── app.js (con A2HS implementado)
├── service-worker.js (actualizado v2)
├── manifest.webmanifest
├── favicon.ico
├── index.html (página principal con botón de instalación)
├── pagina1.html (Brahman)
├── pagina2.html (Cebu)
├── pagina3.html (Sardo Negro)
├── offline.html
├── styles.css
└── README.md
```

## Requisitos del Navegador

- Chrome/Edge 90+
- Firefox 90+
- Safari 15.4+
- Opera 76+

## Display Browser Support

El manifest incluye la propiedad `display_override` que permite al navegador elegir el mejor modo de visualización disponible:

1. **window-controls-overlay**: Integración total con controles de ventana del OS
2. **standalone**: App independiente sin UI del navegador
3. **minimal-ui**: Navegación mínima
4. **browser**: Pestaña del navegador estándar

## Alumna
- **Nombre:** Susana Pacheco Ortiz
- **Matrícula:** 22307026
