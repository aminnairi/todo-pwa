export const createElement = (name, attributes, children) => {
    const element = document.createElement(name);

    Object.entries(attributes).forEach(([attribute, value]) => {
        if (attribute.startsWith("on")) {
            const eventName = attribute.slice(2);

            element.addEventListener(eventName, value);
        } else {
            element.setAttribute(attribute, value);
        }
    });

    children.forEach(child => {
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(children));
        } else {
            element.appendChild(child);
        }
    });

    return element;
}

export const render = (selector, element) => {
    const container = document.querySelector(selector);

    if (container) {
        container.innerHTML = "";

        container.appendChild(element);
    }
};
