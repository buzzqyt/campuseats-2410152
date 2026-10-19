const vendors = [
    {
    id: 'kafe-salahuddin',
    name: 'Kafe Mahallah Salahuddin',
    location: 'Mahallah Salahuddin, Ground Floor',
    openHours: '7:00 am - 10:00 pm',
    isOpen: true,
    menu: [
        { id: 'salah-1', name: 'Nasi Goreng', description: 'Fried rice with vegetables and meat', price: 7.5, category: 'Rice',
available: true },
        { id: 'salah-2', name: 'Mie Goreng', description: 'Fried noodles with vegetables and meat', price: 6, category:
'Noodles', available: true },
        { id: 'salah-3', name: 'Sirap ais', description: 'Cold syrup drink', price: 2.5, category:
'Drinks', available: false },
    ],
 },

 {
 id: 'kafe-aminah',
 name: 'Kafe Mahallah Aminah',
 location: 'Mahallah Aminah, Ground Floor',
 openHours: '8:00 am - 9:00 pm',
 isOpen: true,
 menu: [
 { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken
with sambal and rice', price: 9, category: 'Rice', available: true },
 { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price:
3, category: 'Drinks', available: true },
 ],
 },
]
export default vendors