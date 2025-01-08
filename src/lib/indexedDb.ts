export async function storeKeyInIndexedDB(
    encryptedKey: CryptoKey,
    keyId: string
) {
    const dbRequest = indexedDB.open("KeyDatabase", 1);

    dbRequest.onupgradeneeded = function () {
        const db = dbRequest.result;
        if (!db.objectStoreNames.contains("keys")) {
            db.createObjectStore("keys", { keyPath: "id" });
        }
    };

    return new Promise((resolve, reject) => {
        dbRequest.onsuccess = async function () {
            const db = dbRequest.result;
            try {
                // Export the CryptoKey to JWK format
                const exportedKey = await crypto.subtle.exportKey(
                    "jwk",
                    encryptedKey
                );

                const transaction = db.transaction("keys", "readwrite");
                const store = transaction.objectStore("keys");

                // Store the exported key
                store.put({
                    id: keyId,
                    key: exportedKey,
                    timestamp: Date.now(),
                });

                transaction.oncomplete = resolve;
                transaction.onerror = reject;
            } catch (error) {
                reject(error);
            }
        };

        dbRequest.onerror = function () {
            reject(dbRequest.error);
        };
    });
}

export async function getKeysFromIndexedDB(
    keyId: string
): Promise<CryptoKey | null> {
    const dbRequest = indexedDB.open("KeyDatabase", 1);

    return new Promise((resolve, reject) => {
        dbRequest.onsuccess = function () {
            const db = dbRequest.result;
            const transaction = db.transaction("keys", "readonly");
            const store = transaction.objectStore("keys");
            const request = store.get(keyId);

            request.onsuccess = async function () {
                const record = request.result;
                if (!record) {
                    resolve(null);
                    return;
                }

                try {
                    // Import the JWK back into a CryptoKey
                    const importedKey = await crypto.subtle.importKey(
                        "jwk",
                        record.key,
                        { name: "AES-GCM" }, // Algorithm details must match those used during derivation
                        false,
                        ["encrypt", "decrypt"]
                    );

                    resolve(importedKey);
                } catch (error) {
                    reject(error);
                }
            };
            request.onerror = reject;
        };

        dbRequest.onerror = function () {
            reject(dbRequest.error);
        };
    });
}
