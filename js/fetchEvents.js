// Questo modulo permette di poter fetchare gli eventi dall'API
const dataFetch = new CustomEvent('dataFetch');
export let pubblications = null;

export async function fetchPosts(){
    const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles");
    pubblications = await response.json();
    document.dispatchEvent(dataFetch);
}