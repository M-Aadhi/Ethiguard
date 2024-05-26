let db; // Define db variable globally

// Define defaultValues here
let defaultValues = [
    {
        name: "switchValue",
        value: true,
    },
    {
        name: "numDarkPatternIdentified",
        value: 0,
    },
    {
        name: "darkPatternIdentified",
        value: null,
    },
    {
        name: "textComparison",
        value: null,
    },
];

// Define insertValue function
function insertValue(values) {
    if (db) {
        const insertTransaction = db.transaction("utils", "readwrite");
        const objectStore = insertTransaction.objectStore("utils");

        return new Promise((resolve, reject) => {
            insertTransaction.oncomplete = function () {
                console.log("[COMPLETE] Insertion transactions completed");
                resolve(true);
            };

            insertTransaction.onerror = function () {
                console.log("[ERROR] Default values already present");
                resolve(false);
            };

            values.forEach((util) => {
                let request = objectStore.add(util);

                request.onsuccess = function () {
                    console.log("[SUCCESS] Added " + util.name + " " + util.value);
                };
            });
        });
    }
}

// Define retrieveValue function
function retrieveValue(name) {
    const retrieveTransaction = db.transaction("utils", "readonly");
    const objectStore = retrieveTransaction.objectStore("utils");

    return new Promise((resolve, reject) => {
        retrieveTransaction.oncomplete = function () {
            console.log("[COMPLETE] Retrieve transaction completed");
        };

        retrieveTransaction.onerror = function () {
            console.log("[ERROR] Problem in retrieval");
        };

        let request = objectStore.get(name);

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };
    });
}

// Define createDB function
function createDB() {
    return new Promise((resolve, reject) => {
        const request = self.indexedDB.open("UtilsDB", 1);

        request.onerror = function (event) {
            console.log("[ERROR] Failed to open Database");
            reject();
        };

        request.onupgradeneeded = function (event) {
            db = event.target.result;

            let objectStore = db.createObjectStore("utils", {
                keyPath: "name",
            });

            objectStore.transaction.oncomplete = function (event) {
                console.log("[COMPLETE] ObjectStore created");
                resolve();
            };
        };

        request.onsuccess = function (event) {
            db = event.target.result;
            console.log("[SUCCESS] Database opened successfully");

            insertValue(defaultValues).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });

            db.onerror = function (event) {
                console.log("[ERROR] Failed to open Database");
                reject();
            };
        };
    });
}

// Rest of your code

// Call createDB
createDB().then(() => {
    // Database is initialized, you can perform operations here
}).catch(() => {
    console.log("Error creating database");
});

 
