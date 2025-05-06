// Track all requests made

export class RequestTracker {
    constructor() {
        this.requestLog = [];
    }

    // Function to check if a specific request was made
    checkRequestMade(url, method) {
        return this.requestLog.some(request => 
            request.url.includes(url) && request.method === method
        );
    }

    // Function to get all requests made
    getRequestLog() {
        return [...this.requestLog];
    }

    // Function to clear the request log
    clearRequestLog() {
        this.requestLog.length = 0;
    }

    // Setup XMLHttpRequest tracking
    setupRequestTracking() {
        const originalXHR = window.XMLHttpRequest;
        
        window.XMLHttpRequest = () => {
            const xhr = new originalXHR();
            const originalOpen = xhr.open;
            const originalSend = xhr.send;
            
            xhr.open = (method, url) => {
                this._url = url;
                this._method = method;
                return originalOpen.apply(xhr, arguments);
            };
            
            xhr.send = () => {
                this.requestLog.push({
                    url: this._url,
                    method: this._method,
                    timestamp: new Date().toISOString()
                });
                console.log('Current request log:', this.requestLog);
                return originalSend.apply(xhr, arguments);
            };
            
            return xhr;
        };
    }
}
