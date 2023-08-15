export function createUser(userData) {
    return new Promise(async (resolve) => {
        const response = await fetch("http://localhost:8080/users", {
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

export function checkUser(loginInfo){
    return new Promise(async (resolve,reject) => {
        const response = await fetch(`http://localhost:8080/users?email=${loginInfo.email}`);
        const data = await response.json();
        console.log(data);
        if(data.length){
            if(loginInfo.password === data[0].password){
                resolve({ data : data[0] });
            }else{
                reject({ message: "Invalid email or password" });
            }

        }else{
            reject({ message: "User not found !" });
        }
        
    });
}

export function signOut(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'success' });
        }, 500);
    });
}


