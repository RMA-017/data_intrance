// Topshiriq-2: Ro'yxat olish
// Vazifa: Barcha foydalanuvchilar ro'yxatini olib, ularning ismlarini HTML sahifada ko'rsating.
// API endpoint: https://jsonplaceholder.typicode.com/users
// Bajarilishi kerak:
// Barcha foydalanuvchilarni oling
// Har bir foydalanuvchining ismini <li> elementi ichida ko'rsating
// <ul> ro'yxat yarating

let url = "https://jsonplaceholder.typicode.com/users"

async function getName() {
    try {
        let res = await fetch(url)
        let data = await res.json()
        data.map(item => {
            console.log(item.name);
        })
    } catch (err) {
        console.log(err);
    }
}
getName()