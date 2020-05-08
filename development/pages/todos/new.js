import {render, createElement} from "../../dom.js";
import {goToPage} from "../../router.js";

export const todosNew = () => {
    const onsubmit = async event => {
        event.preventDefault();

        const {description, done, offline} = event.currentTarget;

        const response = await fetch(`http://localhost:8080/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                description: description.value,
                done: done.checked,
                offline: offline.checked,
                id: new Date().getTime()
            })
        });

        if (response && response.ok) {
            goToPage("/todos");
        }
    };

    const onclick = event => {
        event.preventDefault();

        goToPage("/todos");
    };

    render("#root", createElement("div", {}, [
        createElement("h1", {}, ["New Todo"]),
        createElement("a", {href: "", onclick}, ["Todos"]),
        createElement("form", {onsubmit}, [
            createElement("div", {}, [
                createElement("label", {}, [
                    createElement("span", {}, ["Description"]),
                    createElement("input", {type: "text", name: "description", required: true}, []),
                ])
            ]),
            createElement("div", {}, [
                createElement("label", {}, [
                    createElement("span", {}, ["Done?"]),
                    createElement("input", {type: "checkbox", name: "done"}, []),
                ])
            ]),
            createElement("div", {}, [
                createElement("label", {}, [
                    createElement("span", {}, ["Offline?"]),
                    createElement("input", {type: "checkbox", name: "offline"}, [])
                ])
            ]),
            createElement("button", {type: "submit"}, ["Add"])
        ])
    ]));
};
