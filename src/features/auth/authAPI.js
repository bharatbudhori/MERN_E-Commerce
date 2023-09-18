export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch("/auth/signup", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        resolve({ data });
    });
}

export function loginUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/auth/login`, {
                method: "POST",
                body: JSON.stringify(loginInfo),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log({ data });
                resolve({ data });
            } else {
                const error = await response.json();
                reject({ message: error.text });
            }
        } catch (error) {
            console.log({ error });
            reject({ message: error.message });
        }
    });
}

export function signOut(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: "success" });
        }, 500);
    });
}

export function checkUser() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`/auth/check`);
            if (response.ok) {
                const data = await response.json();
                resolve({ data });
            } else {
                const error = await response.json();
                reject({ message: error.text });
            }
        } catch (error) {
            reject({ message: error.message });
        }
    });
}
