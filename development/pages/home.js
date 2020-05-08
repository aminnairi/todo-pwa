import {goToPage} from "../router.js";
import {createElement, render} from "../dom.js";

export const home = () => {
    const onclick = event => {
        event.preventDefault();

        goToPage("/todos");
    };

    render("#root", createElement("div", {}, [
        createElement("h1", {}, ["Home"]),
        createElement("a", {href: "", onclick}, ["Todos"])
    ]));
};
