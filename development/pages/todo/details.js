import {goToPage} from "../../router.js";
import {createElement, render} from "../../dom.js";

export const todoDetails = async ({id}) => {
    const onclick = event => {
        event.preventDefault();

        goToPage("/todos");
    };

    const onsubmit = async (event) => {
        event.preventDefault();

        const {id, description, offline, done} = event.currentTarget;

        const response = await fetch(`http://localhost:8080/todos/${id.value}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                id: id.value,
                description: description.value,
                done: done.checked,
                offline: offline.checked
            })
        });

        if (response && response.ok) {
            goToPage("/todos");
        }
    };

    const deleteTodo = id => async (event) => {
        event.preventDefault();

        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        if (response && response.ok) {
            goToPage("/todos");
        }
    };

    const response = await fetch(`http://localhost:8080/todos/${id}`);

    if (response && response.ok) {
        const {id, description, done, offline} = await response.json();

        render("#root", createElement("div", {}, [
            createElement("h1", {}, ["Todo Details"]),
            createElement("a", {href: "", onclick}, ["Todos"]),
            createElement("form", {onsubmit}, [
                createElement("div", {}, [
                    createElement("label", {}, [
                        createElement("span", {}, ["Identifier"]),
                        createElement("input", {type: "text", disabled: true, value: String(id), name: "id", required: true}, [])
                    ])
                ]),
                createElement("div", {}, [
                    createElement("label", {}, [
                        createElement("span", {}, ["Description"]),
                        createElement("input", {type: "text", value: description, name: "description", required: true}, [])
                    ])
                ]),
                createElement("div", {}, [
                    createElement("label", {}, [
                        createElement("span", {}, ["Done?"]),
                        done
                            ? createElement("input", {type: "checkbox", checked: "", name: "done"}, [])
                            : createElement("input", {type: "checkbox", name: "done"}, [])
                    ])
                ]),
                createElement("div", {}, [
                    createElement("label", {}, [
                        createElement("span", {}, ["Offline?"]),
                        offline
                            ? createElement("input", {type: "checkbox", checked: "", name: "offline"}, [])
                            : createElement("input", {type: "checkbox", name: "offline"}, [])
                    ])
                ]),
                createElement("button", {}, ["update"])
            ]),
            createElement("form", {onsubmit: deleteTodo(id)}, [
                createElement("button", {}, ["delete"])
            ])
        ]));
    } else {
        render("#root", createElement("div", {}, [
            createElement("h1", {}, ["404 - Not Found"]),
            createElement("p", {}, [
                createElement("span", {}, ["Unable to find your todo"]),
                createElement("a", {href: "", onclick, style: "display: block"}, ["Todos"]),
            ])
        ]));
    }
};
