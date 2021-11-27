export function getCookies() {
    let cookiesArray = document.cookie.split(";");
    let cookies: {[key: string]: string} = {};
    for (let i = 0; i < cookiesArray.length; i++) {
        const c = cookiesArray[i].split("=");
        cookies[c[0].trim()] = c[1];
    }
    return cookies;
}