import {whenPageIs, goToPage} from "./router.js";
import {createElement, render} from "./dom.js";
import {todosNew} from "./pages/todos/new.js";
import {todoDetails} from "./pages/todo/details.js";
import {todos} from "./pages/todos.js";
import {home} from "./pages/home.js";

window.addEventListener("load", async () => {
    console.log("Checking if the browser supports service workers...");

    if (!navigator.serviceWorker) {
        console.error("Browser does not support service workers.");

        return;
    }

    console.log("Browser supports service workers.");
    console.log("Registrating the service worker...");

    try {
        await navigator.serviceWorker.register("/service-worker.js");

        console.log("Registrated the service worker successfully.");
    } catch (error) {
        console.error("Failed to register the service worker.");
        console.error(error.message);
    }

    whenPageIs("/", home);
    whenPageIs("/todos", todos);
    whenPageIs("/todos/new", todosNew);
    whenPageIs("/todo/:id", todoDetails);

    goToPage(window.location.pathname)
});
