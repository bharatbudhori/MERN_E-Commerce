export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        //TODO: we will not hardcode the url here
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json();
        resolve({ data });
    });
}

export function fetchProductsByFilters(filter, sort) {
    let queryString = "";
    for (let key in filter) {
        const categoryValues = filter[key];
        if (categoryValues.length) {
            const lastcategoryValue = categoryValues[categoryValues.length - 1];
            queryString += `${key}=${lastcategoryValue}&`;
        }
    }
    for (let key in sort) {
        const sortValue = sort[key];
        queryString += `${key}=${sortValue}&`;
    }

    return new Promise(async (resolve) => {
        //TODO: we will not hardcode the url here
        const response = await fetch(
            "http://localhost:8080/products?" + queryString
        );
        const data = await response.json();
        resolve({ data });
    });
}
