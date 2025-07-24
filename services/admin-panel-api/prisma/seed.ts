/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { ORDERS, PRODUCTS, USERS } from './constants/seed-data';

const prisma = new PrismaClient();

async function seedUsers() {
  const insertedUsers = await Promise.all(
    USERS.map(async ({ firstName, lastName, email, password, phone, role }) => {
      const user = await prisma.user.upsert({
        update: {},
        where: { phone },
        create: {
          firstName,
          lastName,
          phone,
        },
      });

      await prisma.credentials.upsert({
        update: {},
        where: { userId: user.id },
        create: {
          email,
          password: await bcrypt.hash(password, 5),
          role,
          userId: user.id,
        },
      });
    }),
  );

  return insertedUsers;
}

async function seedProducts() {
  const insertedProducts = PRODUCTS.map(async ({ name, price, category }) => {
    return await prisma.product.upsert({
      update: {},
      where: { name },
      create: {
        name,
        price,
        category,
      },
    });
  });

  return insertedProducts;
}

async function seedOrders() {
  for (const {
    customer,
    location,
    productIds = [],
    Deliveryman,
    Manager,
  } of ORDERS) {
    const order = await prisma.order.create({
      data: { customer, location, Deliveryman, Manager },
    });

    for (const productId of productIds) {
      await prisma.orderItems.create({
        data: {
          Order: { connect: { id: order.id } },
          Product: { connect: { id: productId } },
        },
      });
    }
  }
}

async function seedData() {
  try {
    await seedUsers();
    await seedProducts();
    await seedOrders();

    return console.log('Database seeded successfully');
  } catch (error) {
    console.log(error);

    return console.log('Database seeding failed');
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
