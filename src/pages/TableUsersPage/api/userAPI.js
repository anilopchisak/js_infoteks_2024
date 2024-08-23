
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
