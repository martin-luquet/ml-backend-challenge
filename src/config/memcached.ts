import memjs from 'memjs';

/**
 * Configuración de Memcached para la aplicación.
 * Utiliza el cliente memjs para conectarse a un servidor Memcached.
 */
const memcachedClient = memjs.Client.create(process.env.MEMCACHED_URL, {
  retries: 3,       // Número de reintentos
  retry_delay: 0.2, // Tiempo entre reintentos en segundos
  failover: true    // Conmutación por error automática
});

export default memcachedClient;