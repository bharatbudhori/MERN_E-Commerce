export function addToCart(item) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch("http://localhost:8080/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });

        const data = await response.json();
        resolve({ data });
    });
}

export function fetchItemsByUserId(userId) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(
            "http://localhost:8080/cart?user=" + userId
        );

        const data = await response.json();
        resolve({ data });
    });
}

export function updateCart(update) {
    return new Promise(async (resolve) => {
        const response = await fetch(
            "http://localhost:8080/cart/" + update.id,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(update),
            }
        );

        const data = await response.json();
        resolve({ data });
    });
}

export function deleteItemFromCart(id) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/cart/" + id, {
            method: "DELETE",
        });

        const data = await response.json();
        resolve({ data:{id:id} });
    });
}
