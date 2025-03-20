export const generateUserId = (prefix:string) => {
    const now = new Date();
    const yy = now.getFullYear().toString().slice(-2); // Ultime 2 cifre dell'anno
    const mm = String(now.getMonth() + 1).padStart(2, "0"); // Mese (01-12)
    const HH = String(now.getHours()).padStart(2, "0"); // Ora (00-23)
    const MM = String(now.getMinutes()).padStart(2, "0"); // Minuti (00-59)
    const randomNum = String(Math.floor(Math.random() * 100)).padStart(2, "0"); // 2 cifre random

    return `${prefix}${yy}${mm}${HH}${MM}${randomNum}`;
};

export const generatePassword = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";

    let password = "";

    // Genera 2 lettere casuali
    for (let i = 0; i < 2; i++) {
        password += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    // Genera 4 numeri casuali
    for (let i = 0; i < 4; i++) {
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return password;
};

export const addTime = (date: Date, hours: number = 0, days: number = 0): string => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    newDate.setDate(newDate.getDate() + days);

    // Formattazione della data nel formato YYYY-MM-DD HH:mm:ss
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const hoursFormatted = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');
    const seconds = String(newDate.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hoursFormatted}:${minutes}:${seconds}`;
};
