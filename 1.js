// Topshiriq-1: GET so'rov
// Vazifa: JSON Placeholder API dan foydalanib, birinchi postni oling va uning sarlavhasini konsolga chiqaring.
// API endpoint: https://jsonplaceholder.typicode.com/posts/1
// Bajarilishi kerak:
// fetch() yordamida GET so'rov yuboring
// Javobni JSON formatga o'tkazing
// Post sarlavhasini konsolda ko'rsating

let url = "https://jsonplaceholder.typicode.com/posts/1"

async function getData() {
    try {
        let res = await fetch(url)
        let data = await res.json()
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
getData()