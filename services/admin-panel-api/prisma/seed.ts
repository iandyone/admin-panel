/* eslint-disable no-console */
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { ORDERS, PRODUCTS, USERS } from './constants/seed-data';

const prisma = new PrismaClient();

async function seedUsers() {
  for (const u of USERS) {
    await prisma.$transaction(async (tx) => {
      const hashed = await bcrypt.hash(u.password, 10);

      const user = await tx.user.upsert({
        where: { phone: u.phone },
        update: {
          firstName: u.firstName,
          lastName: u.lastName,
          isActive: true,
        },
        create: {
          firstName: u.firstName,
          lastName: u.lastName,
          phone: u.phone,
        },
        select: { id: true },
      });

      await tx.credentials.upsert({
        where: { email: u.email },
        update: {
          password: hashed,
          role: u.role,
          User: { connect: { id: user.id } },
        },
        create: {
          email: u.email,
          password: hashed,
          role: u.role,
          User: { connect: { id: user.id } },
        },
      });
    });
  }
}

async function seedProducts() {
  await prisma.product.createMany({
    data: PRODUCTS.map((p) => ({
      name: p.name,
      category: p.category as any,
      amount: p.amount,
    })),
    skipDuplicates: true,
  });
}

async function seedOrdersOptimized() {
  for (const {
    customer,
    location,
    Deliveryman,
    Manager,
    createdAt,
    updatedAt,
    status,
    productIds = [],
  } of ORDERS) {
    await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          customer,
          location,
          Deliveryman,
          Manager,
          createdAt,
          updatedAt,
          status,
        },
        select: { id: true },
      });

      if (productIds.length === 0) return;

      const qtyMap = new Map<number, number>();

      for (const id of productIds) qtyMap.set(id, (qtyMap.get(id) ?? 0) + 1);
      const uniqueIds = [...qtyMap.keys()];

      const products = await tx.product.findMany({
        where: { id: { in: uniqueIds } },
        select: { id: true, amount: true },
      });
      const priceById = new Map(products.map((p) => [p.id, p.amount]));

      const itemsData = uniqueIds.map((productId) => {
        const quantity = qtyMap.get(productId)!;
        const amount = priceById.get(productId);

        if (amount == null) {
          throw new Error(
            `Product ${productId} not found for order ${order.id}`,
          );
        }

        return { orderId: order.id, productId, quantity, amount };
      });

      await tx.ordersItems.createMany({
        data: itemsData,
        skipDuplicates: true,
      });

      const totalAmount = itemsData.reduce((acc, { quantity, amount }) => {
        const dec = new Prisma.Decimal(amount as any);

        return acc.plus(dec.times(quantity));
      }, new Prisma.Decimal(0));

      await tx.order.update({
        where: { id: order.id },
        data: { totalAmount },
      });
    });
  }
}

async function seedData() {
  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE
      "orders_items", "orders", "products", "credentials", "users"
      RESTART IDENTITY CASCADE;`);

    await seedUsers();
    await seedProducts();
    await seedOrdersOptimized();

    return console.log('Database seeded successfully');
  } catch (error) {
    console.log(error);

    return console.log('Database seeding failed');
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
