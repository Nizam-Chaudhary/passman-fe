export async function storeKeyInIndexedDB(encryptedKey: string, keyId: string) {
    const dbRequest = indexedDB.open("KeyDatabase", 1);

    dbRequest.onupgradeneeded = function () {
        const db = dbRequest.result;
        if (!db.objectStoreNames.contains("keys")) {
            db.createObjectStore("keys", { keyPath: "id" });
        }
    };

    return new Promise((resolve, reject) => {
        dbRequest.onsuccess = function () {
            const db = dbRequest.result;
            const transaction = db.transaction("keys", "readwrite");
            const store = transaction.objectStore("keys");
            store.put({
                id: keyId,
                key: encryptedKey,
                timestamp: Date.now(),
            });
            transaction.oncomplete = resolve;
            transaction.onerror = reject;
        };

        dbRequest.onerror = function () {
            reject(dbRequest.error);
        };
    });
}

export async function getKeysFromIndexedDB(keyId: string) {
    const dbRequest = indexedDB.open("KeyDatabase", 1);

    return new Promise((resolve, reject) => {
        dbRequest.onsuccess = function () {
            const db = dbRequest.result;
            const transaction = db.transaction("keys", "readonly");
            const store = transaction.objectStore("keys");
            const request = store.get(keyId);

            request.onsuccess = function () {
                resolve(request.result ? request.result : null);
            };
            request.onerror = reject;
        };

        dbRequest.onerror = function () {
            reject(dbRequest.error);
        };
    });
}
