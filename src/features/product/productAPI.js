export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        //TODO: we will not hardcode the url here
        const response = await fetch("http://localhost:8080/products");
        const data = await response.json();
        resolve({ data });
    });
}

export function fetchProductsByFilters(filter, sort, pagination) {
    //filters = {"category" : ["smartphone", "laptop"], "brand" : ["apple", "samsung"]]}
    //sort = {_sort: "price", _order: "desc"}
    //pagination = {_page: "1", _limit: 10} // _page=1&_limit=10
    //TODO : on server we will support multiple values for the same filter
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

    for (let key in pagination) {
        const paginationValue = pagination[key];
        queryString += `${key}=${paginationValue}&`;
    }

    return new Promise(async (resolve) => {
        //TODO: we will not hardcode the url here
        const response = await fetch(
            "http://localhost:8080/products?" + queryString
        );
        const data = await response.json();
        const totalItems = response.headers.get("x-total-count");
        resolve({ data: { products: data, totalItems: +totalItems } });
    });
}

export function fetchAllCategories() {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/categories");
        const data = await response.json();
        resolve({ data });
    });
}

export function fetchAllBrands() {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/brands");
        const data = await response.json();
        resolve({ data });
    });
}
