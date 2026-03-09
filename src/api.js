import MacBook from "./assets/MacBook.jpg"

const mockProducts = [

    {
        "id": 1,
        "title": "Apple MacBook Air 13",
        "price": 65490,
        "category": "Техника",
        "image": "/src/assets/MacBook.jpg",
        "description": "Apple M1/13.3/2560x1600/8GB/256GB SSD/DVD нет/Apple graphics 7-core/Wi-Fi/macOS"
    },
    {
        "id": 2,
        "title": "Apple iPhone 17 Pro",
        "price": 105490,
        "category": "Смартфоны",
        "image": "/src/assets/Iphone.jpg",
        "description": "6.1\" OLED (2556x1179) 120 Гц / Apple A17 Pro / 256GB / Камера 48+12+12 МП / Титановый корпус"
    },
    {
        "id": 3,
        "title": "Apple Watch Ultra 3",
        "price": 67690,
        "category": "Гаджеты",
        "image": "/src/assets/AppleWatch.jpg",
        "description": "Алюминий 45мм / OLED дисплей 2000 нит / Измерение кислорода в крови / ЭКГ / Водонепроницаемость 50м"
    },
    {
        "id": 4,
        "title": "Sony PlayStation 5",
        "price": 59900,
        "category": "Игры",
        "image": "/src/assets/Playstation.jpg",
        "description": "AMD Ryzen Zen 2 / 16GB GDDR6 / SSD 825GB / Поддержка 4K 120Hz / Геймпад DualSense в комплекте"
    },
    {
        "id": 5,
        "title": "Apple AirPods Pro 2",
        "price": 16490,
        "category": "Аудио",
        "image": "/src/assets/Airpods.jpg",
        "description": "Активное шумоподавление (ANC) / Чип H2 / Прозрачный режим / До 30 часов работы с кейсом MagSafe"
    },
    {
        "id": 6,
        "title": "Apple iPad Pro 11",
        "price": 79990,
        "category": "Планшеты",
        "image": "/src/assets/Ipad.jpg",
        "description": "11\" Liquid Retina (2388x1668) 120 Гц / Чип Apple M2 / 256GB / Поддержка Apple Pencil 2-го поколения"
    },
    {
        "id": 7,
        "title": "Dyson Supersonic",
        "price": 29990,
        "category": "Дом",
        "image": "/src/assets/Dyson.jpg",
        "description": "Фен для волос / Мощность 1600 Вт / 3 скорости / 4 температурных режима / 5 магнитных насадок"
    },
    {
        "id": 8,
        "title": "Nintendo Switch 2",
        "price": 45000,
        "category": "Игры",
        "image": "/src/assets/Nintendo.jpg",
        "description": " 256GB встроенной памяти / Обновленная док-станция с LAN-портом / Джойконы в комплекте"
    },
    {
        "id": 9,
        "title": "Apple Vision Pro",
        "price": 536000,
        "category": "Гаджеты",
        "image": "/src/assets/VisionPro.jpg",
        "description": "Шлем смешанной реальности / Micro-OLED 3D дисплеи / Чипы M2 и R1 / Отслеживание глаз и рук / visionOS"
    },
    {
        "id": 10,
        "title": "Marshall Major IV",
        "price": 6890,
        "category": "Аудио",
        "image": "/src/assets/Marshall.jpg",
        "description": "Беспроводные накладные наушники / До 80 часов воспроизведения / Быстрая беспроводная зарядка / Bluetooth 5.0"
    },
    {
        "id": 11,
        "title": "Xiaomi Robot Vacuum S10+",
        "price": 17490,
        "category": "Дом",
        "image": "/src/assets/Xiaomi.jpg",
        "description": "Робот-пылесос / Сухая и влажная уборка / Мощность всасывания 4000 Па / Лазерная навигация LDS / 5200 мАч"
    },
    {
        "id": 12,
        "title": "Apple TV 4K",
        "price": 16990,
        "category": "Дом",
        "image": "/src/assets/AppleTV.jpg",
        "description": "ТВ-приставка / Чип A15 Bionic / 64GB / Поддержка 4K Dolby Vision и HDR10+ / Пульт Siri Remote (USB-C)"
    }
]

export const fetchProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProducts);
        }, 800)
    })
}