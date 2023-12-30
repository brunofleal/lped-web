
const TOKEN_KEY = 'tokenb64';

export const registerToken = (token: string) => {
    const base64Token = token;
    localStorage.setItem(TOKEN_KEY, base64Token);
};

export const retrieveToken = () => {
    const base64Token = localStorage.getItem(TOKEN_KEY);
    const token = base64Token;
    return token;
};

export const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

