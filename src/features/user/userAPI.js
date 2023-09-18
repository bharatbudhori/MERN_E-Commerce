export function fecthLoggedInUserOrders() {
    return new Promise(async (resolve) => {
        const response = await fetch(
            "/orders/own/"
        );
        const data = await response.json();
        resolve({ data });
    });
}

export function fetchLoggedInUser() {
    return new Promise(async (resolve) => {
        const response = await fetch("/users/own");
        const data = await response.json();
        resolve({ data });
    });
}

export function updateUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch(
            `/users/${userData.id}`,
            {
                method: "PATCH",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        resolve({ data });
    });
}
