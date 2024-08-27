// все users
export const fetchUserList = async () => {
    try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        console.log(data); // Данные для отладки
        return data;
    } catch (error) {
        console.error("Failed to fetch user list:", error);
        throw error; // Пробрасываем ошибку, чтобы она могла быть обработана
    }
}

// user по id
export const fetchUser = async (id) => {
    try {
        const response = await fetch('https://dummyjson.com/users/'+ id);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Failed to fetch user list:", error);
        throw error;
    }
}

export const fetchFilter = async (value, keys) => {
    try {
        let res = [];
        for (let i = 0; i < keys.length; i++) {
            const response = await fetch('https://dummyjson.com/users/filter?key=' + keys[i] + '&value=' + encodeURIComponent(value));
            const data = await response.json();
            if (data.users.length > 0)
            {
                res = data;
                break;
            }
        }
        console.log('res:' + res);
        return res;
    } catch (error) {
        console.error("Failed to fetch user list:", error);
        throw error;
    }
}