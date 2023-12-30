
const AVATAR_KEY = 'avatar';

export const registerAvatar = (token: string) => {
    const base64Token = btoa(token);
    localStorage.setItem(AVATAR_KEY, base64Token);
};

export const retrieveAvatar = () => {
    const base64Token = localStorage.getItem(AVATAR_KEY);
    const token = atob(base64Token ?? '');
    return token;
};

export const clearAvatar = () => {
    localStorage.removeItem(AVATAR_KEY);
};

