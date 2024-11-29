const API_URL = 'http://localhost:3000/comments';

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
});

self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-comment') {
        console.log('Service Worker: Sync event triggered');
        event.waitUntil(postComment());
    }
});

function postComment() {
    return new Promise((resolve, reject) => {
        const message = localStorage.getItem('pendingMessage') || 'Default comment';
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comment: message }),
        })
        .then((response) => {
            if (!response.ok) throw new Error('Failed to post comment');
            console.log('Comment posted successfully:', message);
            localStorage.removeItem('pendingMessage');
        })
        .catch((error) => {
            console.error('Error during background sync:', error);
        });
        
    });
}