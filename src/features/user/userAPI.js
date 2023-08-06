export function fecthLoggedInUserOrders(userId) {
    return new Promise(async (resolve) => {
        const response = await fetch(
            "http://localhost:8080/orders/?users.id=" + userId
        );
        const data = await response.json();
        resolve({ data });
    });
}
