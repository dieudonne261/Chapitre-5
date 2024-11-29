if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registered for Background Sync!'))
        .catch((error) => console.error('Service Worker registration failed:', error));
}

function sendMessage(message) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((sw) => {
            return sw.sync.register('sync-comment').then(() => {
                console.log(`Message "${message}" queued for background sync.`);
                localStorage.setItem('pendingMessage', message);
            });
        });
    }
}