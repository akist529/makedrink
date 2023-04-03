export const ingredients = fetch('http://15.204.244.7:8585/ingredients', {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json"
    }
}).then(response => {
    return response.json()
}).then(data => {
    console.log(data)
    return data
})