export function createOrder(order) {
    return new Promise(async (resolve) => {
        const response = await fetch("/orders", {
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

export function fetchAllOrders(sort, pagination) {
    let queryString = "";

    for (let key in sort) {
        const sortValue = sort[key];
        queryString += `${key}=${sortValue}&`;
    }

    for (let key in pagination) {
        const paginationValue = pagination[key];
        queryString += `${key}=${paginationValue}&`;
    }

    return new Promise(async (resolve) => {
        //TODO: we will not hardcode the u rl here
        const response = await fetch(
            "/orders?" + queryString
        );
        const data = await response.json();
        const totalOrders = response.headers.get("X-Total-Count");
        resolve({ data: { orders: data, totalOrders: +totalOrders } });
    });
}

export function updateOrder(order) {
    return new Promise(async (resolve) => {
        const response = await fetch(
            "/orders/" + order.id,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            }
        );

        const data = await response.json();
        resolve({ data });
    });
}
