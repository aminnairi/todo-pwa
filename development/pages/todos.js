import {goToPage} from "../router.js";
import {createElement, render} from "../dom.js";

export const todos = async () => {
    let todos = [];

    const onclick = event => {
        event.preventDefault();

        goToPage("/");
    };

    const goToNewTodoPage = event => {
        event.preventDefault();

        goToPage("/todos/new");
    };

    const todoDetails = id => event => {
        event.preventDefault();

        goToPage(`/todo/${id}`);
    };

    try {
        const response = await fetch("http://localhost:8080/todos", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "GET"
        });

        if (!response || !response.ok) {
            throw new Error();
        }

        const json = await response.json();

        todos = json;
    } catch (error) {
        todos = [];
    } finally {
        render("#root", createElement("div", {}, [
            createElement("h1", {}, ["Todos"]),
            createElement("a", {href: "", onclick, style: "padding-right: 10px"}, ["Home"]),
            createElement("a", {href: "", onclick: goToNewTodoPage}, ["new"]),
            createElement("ul", {}, [
                ...todos.map(({id, description, done}) => createElement("li", {}, [
                    createElement("span", {style: `text-decoration: ${done ? "line-through" : "none"}`}, [description]),
                    createElement("button", {onclick: todoDetails(id)}, ["more"])
                ]))
            ])
        ]));
    }
};
