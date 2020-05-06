window.addEventListener("load", async () => {
    console.log("Checking if the browser supports service workers...");

    if (!navigator.serviceWorker) {
        console.error("Browser does not support service workers.");

        return;
    }

    console.log("Browser supports service workers.");
    console.log("Registrating the service worker...");

    try {
        await navigator.serviceWorker.register("./service-worker.js");

        console.log("Registrated the service worker successfully.");
    } catch (error) {
        console.error("Failed to register the service worker.");
        console.error(error.message);
    }


    console.log("Fetching todos...");

    try {
        const response = await fetch("http://localhost:8080/todos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Server does not respond with an OK response.");
        }

        const todos = await response.json();

        console.log(todos);
    } catch (error) {
        console.error("Unable to fetch the todos...");
        console.error(error.message);
    }
});
