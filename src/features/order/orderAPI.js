export function createOrder(order) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });

        const data = await response.json();
        resolve({ data });
    });
}

export function fetchAllOrders(pagination) {
    let queryString = "";

    for (let key in pagination) {
        const paginationValue = pagination[key];
        queryString += `${key}=${paginationValue}&`;
    }

    return new Promise(async (resolve) => {
        //TODO: we will not hardcode the u rl here
        const response = await fetch(
            "http://localhost:8080/orders?" + queryString
        );
        const data = await response.json();
        const totalOrders = response.headers.get("x-total-count");
        resolve({ data: { orders: data, totalOrders: +totalOrders } });
    });
}