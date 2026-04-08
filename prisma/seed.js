const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const MENU_ITEMS = [
  { name: "Full House Bunny Chow", category: "Bunny Chows", price: 120, description: "Quarter loaf filled with rich, spicy mutton curry. A township classic served with carrot salad.", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800", isBestSeller: true },
  { name: "Beef Bunny Chow", category: "Bunny Chows", price: 100, description: "Tender slow-cooked beef curry in a fresh half loaf. Rich, hearty and full of flavour.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" },
  { name: "Sticky BBQ Ribs (500g)", category: "Ribs", price: 150, description: "Flame-grilled local pork ribs, glazed with our secret sticky BBQ sauce. Fall-off-the-bone good.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", isBestSeller: true },
  { name: "Kota Special", category: "Kota", price: 80, description: "Quarter loaf loaded with chips, polony, russian, egg, cheese and atchar. The real deal.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800", isBestSeller: true },
  { name: "Kota Deluxe", category: "Kota", price: 110, description: "Our Kota Special + extra meat, grilled chicken strips, and double the cheese.", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800", isNew: true },
  { name: "Wings & Chips Combo (6pc)", category: "Wings", price: 85, description: "6 crispy wings (spicy or BBQ) served with a generous portion of golden chips.", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=800" },
  { name: "Classic Beef Burger", category: "Burgers", price: 75, description: "150g pure beef patty, lettuce, tomato, caramelised onions and our special house sauce.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000" },
  { name: "Loaded Chips", category: "Chips", price: 45, description: "Fresh-cut chips seasoned with our spice blend. Topped with cheese sauce and atchar.", image: "https://images.unsplash.com/photo-1583150820850-7a2e2a45-1abc?auto=format&fit=crop&q=80&w=800" },
  { name: "Family Feast Combo", category: "Combos", price: 280, description: "2x Bunny Chows + 500g Ribs + 4 Wings + 2L Cold Drink. Perfect for the family!", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=1000", isBestSeller: true },
];

async function main() {
  const hash = await bcrypt.hash('password123', 10);

  // 1. Create ADMIN User
  await prisma.user.upsert({
    where: { email: 'admin@azania.co.za' },
    update: {},
    create: {
      name: 'Azania Admin',
      email: 'admin@azania.co.za',
      phone: '0820000001',
      password: hash,
      role: 'ADMIN'
    }
  });

  // 2. Create RIDER User
  await prisma.user.upsert({
    where: { phone: '0820000002' },
    update: {},
    create: {
      name: 'Thabo The Rider',
      email: 'rider@azania.co.za',
      phone: '0820000002',
      password: hash,
      role: 'RIDER'
    }
  });

  // 3. Create normal CUSTOMER User
  await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'customer@test.com',
      phone: '0820000003',
      password: hash,
      role: 'CUSTOMER'
    }
  });

  // 4. Seed Menu Items
  for (const item of MENU_ITEMS) {
    // Basic existence check
    const existing = await prisma.menuItem.findFirst({ where: { name: item.name }});
    if (!existing) {
      await prisma.menuItem.create({ data: item });
    }
  }

  console.log("Database seeded successfully with ADMIN, RIDER, CUSTOMER and MENU.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
