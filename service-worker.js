const CACHE_NAME = 'family-finance-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Tajawal:wght@300;400;500;700;900&display=swap'
];

// تثبيت الـ Service Worker وحفظ الملفات في الذاكرة المخبأة
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تفعيل المحرك ومسح الكاش القديم تلقائياً عند التحديث
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// استراتيجية جلب البيانات الحركية (Network First, fallback to Cache) لتأمين عمل التطبيق بدون نت
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
