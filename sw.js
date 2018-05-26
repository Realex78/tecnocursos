const CACHE_NAME = "frontend-v2"
const cache_url = ["/offline/view.html", "/offline/style.css", "/offline/mapimage.jpg"]
self.addEventListener("install", function(ev) {
	caches.open(CACHE_NAME)
		.then(function(cache){
			return cache.addAll(cache_url)
		})
})
self.addEventListener("activate", function(ev){
	ev.waitUntil(caches.keys().then(function(cache_names) {
		return Promise.all(cache_names.map(function(cache_name){
			if (CACHE_NAME !== cache_name) {
				return caches.delete(cache_name)
			}
		}))
	}))
})
self.addEventListener("fetch", function(ev) {
	ev.respondWith(caches.match(ev.request)
		.then(function(response) {
			if (response) {
				return response
			}
			return fetch(ev.request)
		}).catch(function(err) {
			if (ev.request.mode == "navigate") {
				return caches.match("offline/view.html")
			}
		})
	)
})