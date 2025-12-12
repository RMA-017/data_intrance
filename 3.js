// Topshiriq-3: Qidiruv funksiyasi
// Vazifa: Foydalanuvchi kiritgan ID bo'yicha albom ma'lumotlarini qidiring.
// API endpoint: https://jsonplaceholder.typicode.com/albums/{id}
// Bajarilishi kerak:
// Input maydoni yarating
// Tugma bosilganda kiritilgan ID bo'yicha album ma'lumotini oling
// Natijani sahifada ko'rsating
// Xato bo'lsa (masalan, noto'g'ri ID), xatolik xabarini ko'rsating

let url = "https://jsonplaceholder.typicode.com/albums"

async function getAlbums(id) {
    try {
        let res = await fetch(`${url}/${id}`)
        if (res.status === 404) {
            console.log("bunday album yo'q");
            return
        }
        let data = await res.json()
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}
getAlbums(101)