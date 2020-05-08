const isPatternMatchingPage = (page, pattern) => {
    if (pattern.includes(":")) {
        const regexp = new RegExp(`^${pattern.replace(/:(\w+)/, "(?<$1>[a-zA-Z0-9]+)")}$`);
        return regexp.test(page);
    }

    return page === pattern;
}

const getPageParameters = (page, pattern) => {
    if (!pattern.includes(":")) {
        return {groups: {}};
    }

    const regexp = new RegExp(`^${pattern.replace(/:(\w+)/, "(?<$1>[a-zA-Z0-9]+)")}$`);

    return (regexp.exec(page) || {groups: {}}).groups;
}

export const whenPageIs = (pattern, callback) => {
    window.addEventListener("popstate", () => {
        const pathname = window.location.pathname;


        if (isPatternMatchingPage(pathname, pattern)) {
            callback(getPageParameters(pathname, pattern));
        }
    });
}

export const goToPage = page => {
    window.history.pushState(null, null, page);
    window.dispatchEvent(new CustomEvent("popstate"));
};
