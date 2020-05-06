const CACHE_NAME = "0.1.0";

const FILES_TO_CACHE = [
    "/",
    "/apple-touch-icon.png",
    "/icon.png",
    "/index.css",
    "/index.html",
    "/index.js",
    "/manifest.webmanifest",
    "/medias/apple-touch-icon.png",
    "/medias/icon.png",
    "/styles/index.css"
];

const filesAddedToCache = async (cacheName, filesToCache) => {
    console.log(`Opening cache ${cacheName}...`);

    try {
        const cache = await caches.open(cacheName);

        console.log(`Successfully opened cache ${cacheName}.`);
        console.log("Adding files to cache...");

        await cache.addAll(filesToCache);

        console.log("Successfully added files to cache.");
    } catch (error) {
        console.error(error.message);
    }
}

const cacheOrFallback = async (event) => {
    console.log(`Trying to find ${event.request.url} from the cache...`);

    try {
        const response = await caches.match(event.request);

        console.log(`Successfully found ${event.request.url} and returning the response from the cache.`);

        return response;
    } catch (error) {
        console.log(`Failed to find ${event.request.url} from the cache and fallback to the index page.`);

        const fallbackResponse = await caches.match("/");

        return fallbackResponse;
    }
};

const allCachesDeletedExcept = async (cacheNameToKeep) => {
    console.log(`Gathering all cache names...`);

    try {
        const cacheNames = await caches.keys(); 

        console.log(`Successfully gathered all cache names.`);
        console.log(`Gathering all cache names that does not match the name ${cacheNameToKeep}...`);

        const cacheNamesToDelete = cacheNames.filter(cacheName => cacheName !== cacheNameToKeep);

        console.log(`Successfully gathered all cache names that does not match the name ${cacheNameToKeep}.`);
        console.log(`Deleting all cache names that does not match the name ${cacheNameToKeep}...`);

        await Promise.all(cacheNamesToDelete.map(cacheName => caches.delete(cacheName)));

        console.log(`Successfully deleted all cache names that does not match the name ${cacheNameToKeep}...`);
    } catch (error) {
        console.error(error.message);
    }
};

self.addEventListener("install", event => {
    console.log(`Installing files to the cache name ${CACHE_NAME} ...`);

    event.waitUntil(filesAddedToCache(CACHE_NAME, FILES_TO_CACHE));
});

self.addEventListener("fetch", event => {
    console.log(`Intercepting ${event.request.url}...`);

    event.respondWith(cacheOrFallback(event));
});

self.addEventListener("activate", event => {
    console.log(`Activating the service worker's named ${CACHE_NAME}...`);

    event.waitUntil(allCachesDeletedExcept(CACHE_NAME));
});
