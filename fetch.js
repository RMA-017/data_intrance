
async function getDataAllMethod() {
    try {
        let data = await (await fetch("http://localhost:4001")).json()
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
getDataAllMethod()