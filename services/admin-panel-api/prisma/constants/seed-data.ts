import { Prisma } from '@prisma/client';

export const USERS: Array<
  Prisma.UserCreateInput & Prisma.CredentialsCreateInput
> = [
  {
    firstName: 'admin',
    lastName: 'admin',
    phone: '+375291111111',
    role: 'ADMIN',
    password: 'root',
    email: 'admin@test.com',
  },
  {
    firstName: 'manager',
    lastName: 'manager',
    phone: '+375292222222',
    role: 'MANAGER',
    password: 'root',
    email: 'manager@test.com',
  },
  {
    firstName: 'deliveryman',
    lastName: 'deliveryman',
    phone: '+375293333333',
    role: 'DELIVERY',
    password: 'root',
    email: 'delivery@test.com',
  },
];

export const PRODUCTS: Array<Prisma.ProductCreateInput> = [
  // APPETIZERS
  { name: 'Draniki (Potato Pancakes)', category: 'APPETIZERS', price: 6.5 },
  {
    name: 'Kolduny (Meat-Stuffed Dumplings)',
    category: 'APPETIZERS',
    price: 7.0,
  },
  {
    name: 'Syrniki (Cottage Cheese Fritters)',
    category: 'APPETIZERS',
    price: 5.75,
  },
  {
    name: 'Zrazy (Meat Roll with Mushroom Filling)',
    category: 'APPETIZERS',
    price: 8.25,
  },

  // SOUPS
  { name: 'Borshch (Beet Soup)', category: 'SOUPS', price: 6.75 },
  { name: 'Krupnik (Barley Soup)', category: 'SOUPS', price: 6.25 },
  { name: 'Kapusnyak (Cabbage Soup)', category: 'SOUPS', price: 5.99 },
  { name: 'Okroshka (Cold Summer Soup)', category: 'SOUPS', price: 5.5 },

  // SALADS
  { name: 'Olivier Salad', category: 'SALADS', price: 7.5 },
  { name: 'Vinaigrette Salad', category: 'SALADS', price: 6.5 },
  { name: 'Beetroot Salad with Garlic', category: 'SALADS', price: 6.0 },
  { name: 'Herring Under a Fur Coat (Shuba)', category: 'SALADS', price: 7.99 },

  // MAINS
  { name: 'Machanka (Pork Stew)', category: 'MAINS', price: 14.0 },
  { name: 'Draniki with Machanka', category: 'MAINS', price: 13.5 },
  { name: 'Kabli (Potato-Stuffed Pancakes)', category: 'MAINS', price: 12.75 },
  { name: 'Zhur (Savory Oat Porridge)', category: 'MAINS', price: 11.5 },

  // DESSERTS
  { name: 'Medovik (Honey Cake)', category: 'DESSERTS', price: 6.5 },
  {
    name: 'Klittenki (Quark Dumplings with Plum)',
    category: 'DESSERTS',
    price: 7.25,
  },
  { name: 'Chornitsa (Blueberry Kissel)', category: 'DESSERTS', price: 5.99 },
  { name: 'Zefir (Light Fruit Confection)', category: 'DESSERTS', price: 6.0 },

  // DRINKS
  { name: 'Kvass', category: 'DRINKS', price: 3.5 },
  { name: 'Kompot', category: 'DRINKS', price: 3.0 },
  { name: 'Kisel', category: 'DRINKS', price: 2.75 },
  { name: 'Berry Mors', category: 'DRINKS', price: 3.25 },

  // ALCOHOL
  { name: 'Krambambulya (Spiced Mead)', category: 'ALCOHOL', price: 8.5 },
  { name: 'Medovukha (Honey Mead)', category: 'ALCOHOL', price: 9.0 },
  { name: 'Belarusian Vodka', category: 'ALCOHOL', price: 12.0 },
  { name: 'Craft Beer (Local)', category: 'ALCOHOL', price: 7.5 },
];

export const ORDERS: Array<Prisma.OrderCreateInput & { productIds: number[] }> =
  [
    {
      customer: 'Ivan',
      location: 'Minsk, Nemiga St 4-23',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [2, 4],
    },
    {
      customer: 'Maria',
      location: 'Minsk, Independence Ave 10-5',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [3, 6],
    },
    {
      customer: 'Oleg',
      location: 'Minsk, Kirova St 12-8',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [1, 21],
    },
    {
      customer: 'Elena',
      location: 'Zhodino, Lenina St 7-2',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [1, 3, 27],
    },
    {
      customer: 'Sergey',
      location: 'Smalyavichy, Sovetskaya St 15-1',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [20, 7, 4],
    },
    {
      customer: 'Olga',
      location: 'Zaslawye, Starominsky St 21-10',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [7, 10, 26],
    },

    {
      customer: 'Dmitry',
      location: 'Fanipol, Rizhevskaya St 3-2',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [18, 21],
    },
    {
      customer: 'Natalia',
      location: 'Minsk, Franziska Skoriny St 5-4',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [13, 4, 20],
    },
    {
      customer: 'Pavel',
      location: 'Minsk, Karla Marksa St 20-6',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [27, 2, 10],
    },
    {
      customer: 'Irina',
      location: 'Minsk, Internatsionalnaya St 8-5',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [7, 13, 2],
    },
    {
      customer: 'Andrei',
      location: 'Zhodino, Nemiga St 9-4',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [3, 19],
    },
    {
      customer: 'Svetlana',
      location: 'Smalyavichy, Independence Ave 2-7',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [4, 12, 16, 20],
    },
    {
      customer: 'Mikhail',
      location: 'Zaslawye, Kirova St 16-3',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [8, 22, 11, 3, 5],
    },
    {
      customer: 'Yulia',
      location: 'Fanipol, Franziska Skoriny St 1-9',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [1, 2, 5, 13],
    },
    {
      customer: 'Nikolai',
      location: 'Minsk, Sovetskaya St 14-2',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [11, 23, 2, 8],
    },
    {
      customer: 'Tatiana',
      location: 'Minsk, Starominsky St 6-11',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [7, 12, 12, 3],
    },
    {
      customer: 'Vladimir',
      location: 'Zhodino, Karla Marksa St 5-8',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [1, 5, 22, 24],
    },
    {
      customer: 'Daria',
      location: 'Smalyavichy, Nemiga St 3-6',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [1, 6, 15, 22, 14],
    },
    {
      customer: 'Alexei',
      location: 'Zaslawye, Independence Ave 12-1',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [6, 13],
    },
    {
      customer: 'Irina',
      location: 'Fanipol, Kirova St 8-4',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [22, 12, 2],
    },
    {
      customer: 'Boris',
      location: 'Minsk, Lenina St 11-3',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [1, 11, 21],
    },
    {
      customer: 'Lydia',
      location: 'Minsk, Rizhevskaya St 9-5',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [3, 13, 23],
    },
    {
      customer: 'Eugene',
      location: 'Zhodino, Internatsionalnaya St 4-7',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [4, 14, 24],
    },
    {
      customer: 'Sofia',
      location: 'Smalyavichy, Franziska Skoriny St 7-2',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [5, 15, 25],
    },
    {
      customer: 'Konstantin',
      location: 'Zaslawye, Nemiga St 10-9',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [6, 16, 26],
    },
    {
      customer: 'Elena',
      location: 'Fanipol, Independence Ave 2-4',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [7, 17, 27],
    },
    {
      customer: 'Victor',
      location: 'Minsk, Starominsky St 5-6',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [8, 18, 27],
    },
    {
      customer: 'Olga',
      location: 'Minsk, Kirova St 14-2',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [9, 19],
    },
    {
      customer: 'Pavel',
      location: 'Zhodino, Sovetskaya St 6-3',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [10, 20],
    },
    {
      customer: 'Maria',
      location: 'Smalyavichy, Karla Marksa St 13-7',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 2 } },
      productIds: [11, 21],
    },
    {
      customer: 'Dmitry',
      location: 'Zaslawye, Internatsionalnaya St 1-8',
      Deliveryman: { connect: { id: 3 } },
      Manager: { connect: { id: 1 } },
      productIds: [12, 22],
    },
  ];
