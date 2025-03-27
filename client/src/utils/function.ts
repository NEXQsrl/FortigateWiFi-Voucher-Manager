// Function to generate a unique user ID with a prefix
export const generateUserId = (prefix: string) => {
  const now = new Date();
  const yy = now.getFullYear().toString().slice(-2); // Last 2 digits of the year
  const mm = String(now.getMonth() + 1).padStart(2, "0"); // Month (01-12)
  const HH = String(now.getHours()).padStart(2, "0"); // Hour (00-23)
  const MM = String(now.getMinutes()).padStart(2, "0"); // Minutes (00-59)
  const randomNum = String(Math.floor(Math.random() * 100)).padStart(2, "0"); // 2 random digits

  return `${prefix}${yy}${mm}${HH}${MM}${randomNum}`;
};

// Function to generate a random password
export const generatePassword = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";

  let password = "";

  // Generate 2 random letters
  for (let i = 0; i < 2; i++) {
    password += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Generate 4 random numbers
  for (let i = 0; i < 4; i++) {
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return password;
};

// Function to add time (hours and days) to a given date
export const addTime = (date: Date, hours: number = 0, days: number = 0): string => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  newDate.setDate(newDate.getDate() + days);

  // Format the date as YYYY-MM-DD HH:mm:ss
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');
  const hoursFormatted = String(newDate.getHours()).padStart(2, '0');
  const minutes = String(newDate.getMinutes()).padStart(2, '0');
  const seconds = String(newDate.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hoursFormatted}:${minutes}:${seconds}`;
};
