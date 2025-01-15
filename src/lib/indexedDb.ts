import { INDEXED_DB_KEYS_STORE, INDEXED_DB_NAME } from "./constants";

export async function storeKeyInIndexedDB(
    encryptedKey: CryptoKey,
    keyId: string
) {
    const dbRequest = indexedDB.open(INDEXED_DB_NAME, 4);

    dbRequest.onupgradeneeded = () => {
        const db = dbRequest.result;
        if (!db.objectStoreNames.contains(INDEXED_DB_KEYS_STORE)) {
            db.createObjectStore(INDEXED_DB_KEYS_STORE, { keyPath: "id" });
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

                const transaction = db.transaction(
                    INDEXED_DB_KEYS_STORE,
                    "readwrite"
                );
                const store = transaction.objectStore(INDEXED_DB_KEYS_STORE);

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
    const dbRequest = indexedDB.open(INDEXED_DB_NAME, 4);

    return new Promise((resolve, reject) => {
        dbRequest.onsuccess = function () {
            const db = dbRequest.result;
            const transaction = db.transaction(
                INDEXED_DB_KEYS_STORE,
                "readonly"
            );
            const store = transaction.objectStore(INDEXED_DB_KEYS_STORE);
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
