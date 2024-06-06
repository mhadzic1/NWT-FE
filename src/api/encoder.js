// encoder.js
export function encodeCredentials(username, password) {
    let encoder = new TextEncoder();
    let data = encoder.encode(username + ":" + password);
    return btoa(String.fromCharCode(...new Uint8Array(data)));
}