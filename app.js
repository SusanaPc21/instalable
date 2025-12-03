// app.js
// ========== SERVICE WORKER REGISTRATION ==========
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(reg => {
      console.log('Service Worker registrado con éxito:', reg.scope);
    })
    .catch(err => console.error('Error al registrar el SW:', err));
} else {
  alert('Tu navegador no soporta Service Workers.');
}

// ========== ADD TO HOME SCREEN (A2HS) ==========
let deferredPrompt;
const btnInstall = document.getElementById('install-app');

// Capturar el evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt disparado');
  // Prevenir que Chrome muestre el banner automáticamente
  e.preventDefault();
  // Guardar el evento para usarlo después
  deferredPrompt = e;
  // Mostrar el botón de instalación
  if (btnInstall) {
    btnInstall.style.display = 'block';
    btnInstall.disabled = false;
  }
});

// Manejar el click en el botón de instalación
if (btnInstall) {
  btnInstall.addEventListener('click', async () => {
    if (!deferredPrompt) {
      alert('La aplicación ya está instalada o no se puede instalar en este momento.');
      return;
    }

    // Mostrar el prompt de instalación
    deferredPrompt.prompt();
    
    // Esperar la respuesta del usuario
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Usuario respondió: ${outcome}`);
    
    if (outcome === 'accepted') {
      console.log('Usuario aceptó la instalación');
      alert('¡Aplicación instalada exitosamente!');
    } else {
      console.log('Usuario rechazó la instalación');
    }
    
    // Limpiar el prompt ya usado
    deferredPrompt = null;
    btnInstall.style.display = 'none';
  });
}

// Detectar cuando la app ha sido instalada
window.addEventListener('appinstalled', (evt) => {
  console.log('App instalada exitosamente', evt);
  if (btnInstall) {
    btnInstall.style.display = 'none';
  }
});

// Verificar si la app ya está instalada (modo standalone)
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('La app está ejecutándose en modo standalone');
  if (btnInstall) {
    btnInstall.style.display = 'none';
  }
}

const btnRequest = document.getElementById('request-perm');
const btnShow = document.getElementById('show-notif');

// Solicitar permiso de notificaciones
if (btnRequest) {
  btnRequest.addEventListener('click', async () => {
    if (!('Notification' in window)) {
      alert('Este navegador no soporta notificaciones.');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      alert('Permiso concedido para notificaciones.');
    } else if (permission === 'denied') {
      alert('Permiso denegado.');
    } else {
      alert('Permiso: ' + permission);
    }
  });
}

// Mostrar notificación local (sin limitar por tag)
if (btnShow) {
  btnShow.addEventListener('click', async () => {
    if (!('Notification' in window)) {
      return alert('Notificaciones no soportadas.');
    }

    if (Notification.permission !== 'granted') {
      return alert('Primero otorga permiso para notificaciones.');
    }

    try {
      const reg = await navigator.serviceWorker.ready;

      // Generar ID único para permitir varias notificaciones
      const uniqueTag = 'notif-' + Date.now();

      reg.showNotification('Vaquitas', {
        body: 'Explora las mejores razas de vacas.',
        icon: './logo.jpg',
        badge: './logo.jpg',
        vibrate: [200, 100, 200],
        tag: uniqueTag, // Cambia cada vez
        renotify: true // Permite mostrar varias
      });

      console.log('Notificación mostrada con tag:', uniqueTag);
    } catch (err) {
      console.error('Error mostrando notificación:', err);
      alert('Service Worker no registrado todavía.');
    }
  });
}
