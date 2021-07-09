export const getPeople = async () => {
    return fetch('https://randomuser.me/api?results=100').then(res => res.json());
}