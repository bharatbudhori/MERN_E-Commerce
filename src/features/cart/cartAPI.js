export function addToCart(item) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch("/cart", {
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
            "/cart"
        );

        const data = await response.json();
        resolve({ data });
    });
}

export function updateCart(update) {
    return new Promise(async (resolve) => {
        const response = await fetch(
            "/cart/" + update.id,
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
        const response = await fetch("/cart/" + id, {
            method: "DELETE",
        });

        const data = await response.json();
        resolve({ data: { id: id } });
    });
}

export async function resetCart() {
    return new Promise(async (resolve) => {
        const response = await fetchItemsByUserId();
        const items = response.data;
        for (let item of items) {
            await deleteItemFromCart(item.id);
        }
        resolve({ status: "success" });
    });
}
