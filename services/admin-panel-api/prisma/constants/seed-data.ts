import { OrderStatus, Prisma } from '@prisma/client';


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
  { name: 'Draniki (Potato Pancakes)', category: 'APPETIZERS', amount: 6.5 },
  {
    name: 'Kolduny (Meat-Stuffed Dumplings)',
    category: 'APPETIZERS',
    amount: 7.0,
  },
  {
    name: 'Syrniki (Cottage Cheese Fritters)',
    category: 'APPETIZERS',
    amount: 5.75,
  },
  {
    name: 'Zrazy (Meat Roll with Mushroom Filling)',
    category: 'APPETIZERS',
    amount: 8.25,
  },

  // SOUPS
  { name: 'Borshch (Beet Soup)', category: 'SOUPS', amount: 6.75 },
  { name: 'Krupnik (Barley Soup)', category: 'SOUPS', amount: 6.25 },
  { name: 'Kapusnyak (Cabbage Soup)', category: 'SOUPS', amount: 6.0 },
  { name: 'Okroshka (Cold Summer Soup)', category: 'SOUPS', amount: 5.5 },

  // SALADS
  { name: 'Olivier Salad', category: 'SALADS', amount: 7.5 },
  { name: 'Vinaigrette Salad', category: 'SALADS', amount: 6.5 },
  { name: 'Beetroot Salad with Garlic', category: 'SALADS', amount: 6.0 },
  {
    name: 'Herring Under a Fur Coat (Shuba)',
    category: 'SALADS',
    amount: 4.25,
  },

  // MAINS
  { name: 'Machanka (Pork Stew)', category: 'MAINS', amount: 14.0 },
  { name: 'Draniki with Machanka', category: 'MAINS', amount: 13.5 },
  { name: 'Kabli (Potato-Stuffed Pancakes)', category: 'MAINS', amount: 12.75 },
  { name: 'Zhur (Savory Oat Porridge)', category: 'MAINS', amount: 11.5 },

  // DESSERTS
  { name: 'Medovik (Honey Cake)', category: 'DESSERTS', amount: 6.5 },
  {
    name: 'Klittenki (Quark Dumplings with Plum)',
    category: 'DESSERTS',
    amount: 7.25,
  },
  { name: 'Chornitsa (Blueberry Kissel)', category: 'DESSERTS', amount: 5.75 },
  { name: 'Zefir (Light Fruit Confection)', category: 'DESSERTS', amount: 6.0 },

  // DRINKS
  { name: 'Kvass', category: 'DRINKS', amount: 3.5 },
  { name: 'Kompot', category: 'DRINKS', amount: 3.0 },
  { name: 'Kisel', category: 'DRINKS', amount: 2.75 },
  { name: 'Berry Mors', category: 'DRINKS', amount: 3.25 },

  // ALCOHOL
  { name: 'Krambambulya (Spiced Mead)', category: 'ALCOHOL', amount: 8.5 },
  { name: 'Medovukha (Honey Mead)', category: 'ALCOHOL', amount: 9.0 },
  { name: 'Belarusian Vodka', category: 'ALCOHOL', amount: 12.0 },
  { name: 'Craft Beer (Local)', category: 'ALCOHOL', amount: 7.5 },
];


export const ORDERS: Array<Prisma.OrderCreateInput & { productIds: number[] }> = [
  {
    "customer": "Maria",
    "location": "Minsk, Independence Ave 10-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      3,
      6
    ],
    "createdAt": "2025-07-26T16:51:31.000Z",
    "updatedAt": "2025-07-26T16:51:31.000Z",
    "status": "PROCESSING"
  },
  {
    "customer": "Oleg",
    "location": "Minsk, Kirova St 12-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      21
    ],
    "createdAt": "2025-07-26T16:51:31.000Z",
    "updatedAt": "2025-07-26T16:51:31.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Elena",
    "location": "Zhodino, Lenina St 7-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      1,
      3,
      27
    ],
    "createdAt": "2025-07-26T16:51:31.000Z",
    "updatedAt": "2025-07-26T16:51:31.000Z",
    "status": "SHIPPED"
  },
  {
    "customer": "Sergey",
    "location": "Smalyavichy, Sovetskaya St 15-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      20,
      7,
      4
    ],
    "createdAt": "2025-08-12T21:58:13.000Z",
    "updatedAt": "2025-08-12T21:58:13.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Olga",
    "location": "Zaslawye, Starominsky St 21-10",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      7,
      10,
      26
    ],
    "createdAt": "2025-08-11T21:58:13.000Z",
    "updatedAt": "2025-08-11T21:58:13.000Z",
    "status": "DELIVERED"
  },
  {
    "customer": "Dmitry",
    "location": "Fanipol, Rizhevskaya St 3-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      18,
      21
    ],
    "createdAt": "2025-08-17T10:00:22.000Z",
    "updatedAt": "2025-08-17T10:00:22.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Natalia",
    "location": "Minsk, Franziska Skoriny St 5-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      13,
      4,
      20
    ],
    "createdAt": "2025-08-17T10:00:22.000Z",
    "updatedAt": "2025-08-17T10:00:22.000Z",
    "status": "CREATED"
  },
  {
    "customer": "Pavel",
    "location": "Minsk, Karla Marksa St 20-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      27,
      2,
      10
    ],
    "createdAt": "2025-08-02T04:45:21.000Z",
    "updatedAt": "2025-08-02T04:45:21.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Irina",
    "location": "Minsk, Internatsionalnaya St 8-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      7,
      13,
      2
    ],
    "createdAt": "2025-08-02T04:45:21.000Z",
    "updatedAt": "2025-08-02T04:45:21.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Andrei",
    "location": "Zhodino, Nemiga St 9-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      3,
      19
    ],
    "createdAt": "2025-08-02T04:45:21.000Z",
    "updatedAt": "2025-08-02T04:45:21.000Z",
    "status": "PROCESSING"
  },
  {
    "customer": "Svetlana",
    "location": "Smalyavichy, Independence Ave 2-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      12,
      16,
      20
    ],
    "createdAt": "2025-08-02T04:45:21.000Z",
    "updatedAt": "2025-08-02T04:45:21.000Z",
    "status": "DELIVERED"
  },
  {
    "customer": "Mikhail",
    "location": "Zaslawye, Kirova St 16-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      8,
      22,
      11,
      3,
      5
    ],
    "createdAt": "2025-07-29T01:12:17.000Z",
    "updatedAt": "2025-07-29T01:12:17.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Yulia",
    "location": "Fanipol, Franziska Skoriny St 1-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      1,
      2,
      5,
      13
    ],
    "createdAt": "2025-07-27T01:12:17.000Z",
    "updatedAt": "2025-07-27T01:12:17.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Tatiana",
    "location": "Minsk, Starominsky St 6-11",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      7,
      12,
      12,
      3
    ],
    "createdAt": "2025-08-04T05:55:10.000Z",
    "updatedAt": "2025-08-04T05:55:10.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Vladimir",
    "location": "Zhodino, Karla Marksa St 5-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      5,
      22,
      24
    ],
    "createdAt": "2025-07-31T06:15:03.000Z",
    "updatedAt": "2025-07-31T06:15:03.000Z",
    "status": "SHIPPED"
  },
  {
    "customer": "Daria",
    "location": "Smalyavichy, Nemiga St 3-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      1,
      6,
      15,
      22,
      14
    ],
    "createdAt": "2025-07-31T06:15:03.000Z",
    "updatedAt": "2025-07-31T06:15:03.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Alexei",
    "location": "Zaslawye, Independence Ave 12-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      13
    ],
    "createdAt": "2025-08-16T13:12:11.000Z",
    "updatedAt": "2025-08-16T13:12:11.000Z",
    "status": "CREATED"
  },
  {
    "customer": "Irina",
    "location": "Fanipol, Kirova St 8-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      22,
      12,
      2
    ],
    "createdAt": "2025-08-16T13:12:11.000Z",
    "updatedAt": "2025-08-16T13:12:11.000Z",
    "status": "RETURNED"
  },
  {
    "customer": "Irina",
    "location": "Fanipol, Kirova St 8-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      22,
      12,
      2,
      13,
      3
    ],
    "createdAt": "2025-08-15T13:12:11.000Z",
    "updatedAt": "2025-08-15T13:12:11.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Lydia",
    "location": "Minsk, Rizhevskaya St 9-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      3,
      13,
      23
    ],
    "createdAt": "2025-08-14T17:26:33.000Z",
    "updatedAt": "2025-08-14T17:26:33.000Z",
    "status": "SHIPPED"
  },
  {
    "customer": "Eugene",
    "location": "Zhodino, Internatsionalnaya St 4-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      4,
      14,
      24
    ],
    "createdAt": "2025-08-14T17:26:33.000Z",
    "updatedAt": "2025-08-14T17:26:33.000Z",
    "status": "PROCESSING"
  },
  {
    "customer": "Sofia",
    "location": "Smalyavichy, Franziska Skoriny St 7-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      5,
      15,
      25
    ],
    "createdAt": "2025-08-13T17:26:33.000Z",
    "updatedAt": "2025-08-13T17:26:33.000Z",
    "status": "DELIVERED"
  },
  {
    "customer": "Konstantin",
    "location": "Zaslawye, Nemiga St 10-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      16,
      26
    ],
    "createdAt": "2025-08-19T05:52:10.000Z",
    "updatedAt": "2025-08-19T05:52:10.000Z",
    "status": "SHIPPED"
  },
  {
    "customer": "Elena",
    "location": "Fanipol, Independence Ave 2-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      7,
      17,
      27
    ],
    "createdAt": "2025-08-19T05:52:10.000Z",
    "updatedAt": "2025-08-19T05:52:10.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Victor",
    "location": "Minsk, Starominsky St 5-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      8,
      18,
      27
    ],
    "createdAt": "2025-08-19T05:52:10.000Z",
    "updatedAt": "2025-08-19T05:52:10.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Olga",
    "location": "Minsk, Kirova St 14-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      9,
      19
    ],
    "createdAt": "2025-08-18T05:52:10.000Z",
    "updatedAt": "2025-08-18T05:52:10.000Z",
    "status": "CREATED"
  },
  {
    "customer": "Pavel",
    "location": "Zhodino, Sovetskaya St 6-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      10,
      20
    ],
    "createdAt": "2025-08-17T05:52:10.000Z",
    "updatedAt": "2025-08-17T05:52:10.000Z",
    "status": "DELIVERED"
  },
  {
    "customer": "Maria",
    "location": "Smalyavichy, Karla Marksa St 13-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      11,
      21
    ],
    "createdAt": "2025-08-07T15:35:19.000Z",
    "updatedAt": "2025-08-07T15:35:19.000Z",
    "status": "RETURNED"
  },
  {
    "customer": "Dmitry",
    "location": "Zaslawye, Internatsionalnaya St 1-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      12,
      22
    ],
    "createdAt": "2025-08-06T15:35:19.000Z",
    "updatedAt": "2025-08-06T15:35:19.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Anastasia",
    "location": "Minsk, Kalvariyskaya St 19-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      7,
      9
    ],
    "createdAt": "2025-08-08T12:47:15.000Z",
    "updatedAt": "2025-08-08T12:47:15.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Artem",
    "location": "Minsk, Dzerzhinskogo Ave 8-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      6,
      13
    ],
    "createdAt": "2025-07-25T08:26:10.000Z",
    "updatedAt": "2025-07-25T08:26:10.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Valeria",
    "location": "Minsk, Masherova Ave 22-10",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      12
    ],
    "createdAt": "2025-07-25T13:41:33.000Z",
    "updatedAt": "2025-07-25T13:41:33.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "German",
    "location": "Minsk, Yakuba Kolasa St 5-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      19,
      25
    ],
    "createdAt": "2025-07-25T18:59:52.000Z",
    "updatedAt": "2025-07-25T18:59:52.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Nadezhda",
    "location": "Smalyavichy, Mira St 2-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      8,
      15,
      23
    ],
    "createdAt": "2025-08-11T07:05:30.000Z",
    "updatedAt": "2025-08-11T07:05:30.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Stanislav",
    "location": "Zaslawye, Lenina St 10-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      11,
      20
    ],
    "createdAt": "2025-08-11T11:22:18.000Z",
    "updatedAt": "2025-08-11T11:22:18.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Larisa",
    "location": "Minsk, Nemiga St 1-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      3,
      7,
      26
    ],
    "createdAt": "2025-08-11T16:48:03.000Z",
    "updatedAt": "2025-08-11T16:48:03.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Yaroslav",
    "location": "Minsk, Surhanava St 12-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      18
    ],
    "createdAt": "2025-08-16T08:15:11.000Z",
    "updatedAt": "2025-08-16T08:15:11.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Inna",
    "location": "Minsk, Timiryazeva St 9-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      2,
      10,
      27
    ],
    "createdAt": "2025-08-17T12:44:39.000Z",
    "updatedAt": "2025-08-17T12:44:39.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Viktoria",
    "location": "Minsk, Gikalo St 6-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      9,
      21,
      24
    ],
    "createdAt": "2025-08-17T17:58:27.000Z",
    "updatedAt": "2025-08-17T17:58:27.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Denis",
    "location": "Minsk, Kalinina St 3-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      7,
      13
    ],
    "createdAt": "2025-08-04T07:41:10.000Z",
    "updatedAt": "2025-08-04T07:41:10.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Polina",
    "location": "Minsk, Revolyutsionnaya St 17-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      2,
      6,
      15
    ],
    "createdAt": "2025-08-04T12:10:55.000Z",
    "updatedAt": "2025-08-04T12:10:55.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Igor",
    "location": "Minsk, Platonova St 4-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      8,
      11,
      22
    ],
    "createdAt": "2025-08-04T18:23:32.000Z",
    "updatedAt": "2025-08-04T18:23:32.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Margarita",
    "location": "Zhodino, Mira St 9-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      14,
      24
    ],
    "createdAt": "2025-07-31T08:02:00.000Z",
    "updatedAt": "2025-07-31T08:02:00.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Olesya",
    "location": "Smalyavichy, Partizanskaya St 2-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      10
    ],
    "createdAt": "2025-08-01T13:19:20.000Z",
    "updatedAt": "2025-08-01T13:19:20.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Fedor",
    "location": "Minsk, Mayakovskogo St 18-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      9,
      21,
      27
    ],
    "createdAt": "2025-07-31T17:44:59.000Z",
    "updatedAt": "2025-07-31T17:44:59.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Alyona",
    "location": "Fanipol, Lesnaya St 7-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      3,
      5,
      12
    ],
    "createdAt": "2025-08-15T09:09:09.000Z",
    "updatedAt": "2025-08-15T09:09:09.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Bogdan",
    "location": "Zaslawye, Gagarina St 2-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      7,
      16
    ],
    "createdAt": "2025-08-14T12:34:56.000Z",
    "updatedAt": "2025-08-14T12:34:56.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Kristina",
    "location": "Minsk, Filimonova St 11-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      18,
      23
    ],
    "createdAt": "2025-08-15T19:20:30.000Z",
    "updatedAt": "2025-08-15T19:20:30.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Petr",
    "location": "Minsk, Kropotkina St 9-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      2,
      9
    ],
    "createdAt": "2025-08-13T08:02:44.000Z",
    "updatedAt": "2025-08-13T08:02:44.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Tatiana S.",
    "location": "Minsk, Bogdanovicha St 21-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      10,
      15,
      20
    ],
    "createdAt": "2025-08-12T13:30:01.000Z",
    "updatedAt": "2025-08-12T13:30:01.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Grigory",
    "location": "Minsk, Volgogradskaya St 4-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      12,
      26
    ],
    "createdAt": "2025-08-13T18:18:18.000Z",
    "updatedAt": "2025-08-13T18:18:18.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Raisa",
    "location": "Zhodino, Oktyabrskaya St 3-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      7,
      11
    ],
    "createdAt": "2025-08-06T09:00:00.000Z",
    "updatedAt": "2025-08-06T09:00:00.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Vadim",
    "location": "Smalyavichy, Sovetskaya St 8-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      14,
      19
    ],
    "createdAt": "2025-08-06T13:22:45.000Z",
    "updatedAt": "2025-08-06T13:22:45.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Zoya",
    "location": "Minsk, Kotovskogo St 6-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      5,
      16,
      25
    ],
    "createdAt": "2025-08-06T20:11:10.000Z",
    "updatedAt": "2025-08-06T20:11:10.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Anastasia",
    "location": "Minsk, Kalvariyskaya St 19-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      7,
      9
    ],
    "createdAt": "2025-08-08T12:47:15.000Z",
    "updatedAt": "2025-08-08T12:47:15.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Kirill",
    "location": "Minsk, Pobediteley Ave 45-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      2,
      17,
      24
    ],
    "createdAt": "2025-08-08T19:03:44.000Z",
    "updatedAt": "2025-08-08T19:03:44.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Artem",
    "location": "Minsk, Dzerzhinskogo Ave 8-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      6,
      13
    ],
    "createdAt": "2025-07-24T08:26:10.000Z",
    "updatedAt": "2025-07-24T08:26:10.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Valeria",
    "location": "Minsk, Masherova Ave 22-10",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      12
    ],
    "createdAt": "2025-07-24T13:41:33.000Z",
    "updatedAt": "2025-07-24T13:41:33.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "German",
    "location": "Minsk, Yakuba Kolasa St 5-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      19,
      25
    ],
    "createdAt": "2025-07-24T18:59:52.000Z",
    "updatedAt": "2025-07-24T18:59:52.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Nadezhda",
    "location": "Smalyavichy, Mira St 2-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      8,
      15,
      23
    ],
    "createdAt": "2025-08-10T07:05:30.000Z",
    "updatedAt": "2025-08-10T07:05:30.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Yaroslav",
    "location": "Minsk, Surhanava St 12-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      18
    ],
    "createdAt": "2025-08-16T08:15:11.000Z",
    "updatedAt": "2025-08-16T08:15:11.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Inna",
    "location": "Minsk, Timiryazeva St 9-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      2,
      10,
      27
    ],
    "createdAt": "2025-08-16T12:44:39.000Z",
    "updatedAt": "2025-08-16T12:44:39.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Viktoria",
    "location": "Minsk, Gikalo St 6-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      9,
      21,
      24
    ],
    "createdAt": "2025-08-16T17:58:27.000Z",
    "updatedAt": "2025-08-16T17:58:27.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Alena",
    "location": "Minsk, Komsomolskaya St 7-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      5,
      16
    ],
    "createdAt": "2025-08-09T09:03:05.000Z",
    "updatedAt": "2025-08-09T09:03:05.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Oksana",
    "location": "Minsk, Rakovskaya St 14-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      3,
      20
    ],
    "createdAt": "2025-08-09T14:22:49.000Z",
    "updatedAt": "2025-08-09T14:22:49.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Timur",
    "location": "Minsk, Zaslavskaya St 2-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      12,
      18,
      23
    ],
    "createdAt": "2025-08-10T19:57:33.000Z",
    "updatedAt": "2025-08-10T19:57:33.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Denis",
    "location": "Minsk, Kalinina St 3-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      7,
      13
    ],
    "createdAt": "2025-08-02T07:41:10.000Z",
    "updatedAt": "2025-08-02T07:41:10.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Polina",
    "location": "Minsk, Revolyutsionnaya St 17-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      2,
      6,
      15
    ],
    "createdAt": "2025-08-03T12:10:55.000Z",
    "updatedAt": "2025-08-03T12:10:55.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Igor",
    "location": "Minsk, Platonova St 4-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      8,
      11,
      22
    ],
    "createdAt": "2025-08-03T18:23:32.000Z",
    "updatedAt": "2025-08-03T18:23:32.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Margarita",
    "location": "Zhodino, Mira St 9-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      14,
      24
    ],
    "createdAt": "2025-07-30T08:02:00.000Z",
    "updatedAt": "2025-07-30T08:02:00.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Olesya",
    "location": "Smalyavichy, Partizanskaya St 2-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      10
    ],
    "createdAt": "2025-07-31T13:19:20.000Z",
    "updatedAt": "2025-07-31T13:19:20.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Fedor",
    "location": "Minsk, Mayakovskogo St 18-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      9,
      21,
      27
    ],
    "createdAt": "2025-07-31T17:44:59.000Z",
    "updatedAt": "2025-07-31T17:44:59.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Alyona",
    "location": "Fanipol, Lesnaya St 7-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      3,
      5,
      12
    ],
    "createdAt": "2025-08-14T09:09:09.000Z",
    "updatedAt": "2025-08-14T09:09:09.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Bogdan",
    "location": "Zaslawye, Gagarina St 2-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      7,
      16
    ],
    "createdAt": "2025-08-14T12:34:56.000Z",
    "updatedAt": "2025-08-14T12:34:56.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Kristina",
    "location": "Minsk, Filimonova St 11-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      18,
      23
    ],
    "createdAt": "2025-08-13T19:20:30.000Z",
    "updatedAt": "2025-08-13T19:20:30.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Petr",
    "location": "Minsk, Kropotkina St 9-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      2,
      9
    ],
    "createdAt": "2025-08-12T08:02:44.000Z",
    "updatedAt": "2025-08-12T08:02:44.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Tatiana S.",
    "location": "Minsk, Bogdanovicha St 21-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      10,
      15,
      20
    ],
    "createdAt": "2025-08-10T13:30:01.000Z",
    "updatedAt": "2025-08-10T13:30:01.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Grigory",
    "location": "Minsk, Volgogradskaya St 4-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      12,
      26
    ],
    "createdAt": "2025-08-11T18:18:18.000Z",
    "updatedAt": "2025-08-11T18:18:18.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Raisa",
    "location": "Zhodino, Oktyabrskaya St 3-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      7,
      11
    ],
    "createdAt": "2025-08-05T09:00:00.000Z",
    "updatedAt": "2025-08-05T09:00:00.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Vadim",
    "location": "Smalyavichy, Sovetskaya St 8-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      14,
      19
    ],
    "createdAt": "2025-08-05T13:22:45.000Z",
    "updatedAt": "2025-08-05T13:22:45.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Zoya",
    "location": "Minsk, Kotovskogo St 6-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      5,
      16,
      25
    ],
    "createdAt": "2025-08-06T20:11:10.000Z",
    "updatedAt": "2025-08-06T20:11:10.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Roman",
    "location": "Minsk, Engelsa St 3-12",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      5,
      14,
      22
    ],
    "createdAt": "2025-08-07T09:12:00.000Z",
    "updatedAt": "2025-08-07T09:12:00.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Anastasia",
    "location": "Minsk, Kalvariyskaya St 19-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      7,
      9
    ],
    "createdAt": "2025-08-07T12:47:15.000Z",
    "updatedAt": "2025-08-07T12:47:15.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Kirill",
    "location": "Minsk, Pobediteley Ave 45-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      2,
      17,
      24
    ],
    "createdAt": "2025-08-07T19:03:44.000Z",
    "updatedAt": "2025-08-07T19:03:44.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Artem",
    "location": "Minsk, Dzerzhinskogo Ave 8-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      6,
      13
    ],
    "createdAt": "2025-07-24T08:26:10.000Z",
    "updatedAt": "2025-07-24T08:26:10.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Valeria",
    "location": "Minsk, Masherova Ave 22-10",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      12
    ],
    "createdAt": "2025-07-24T13:41:33.000Z",
    "updatedAt": "2025-07-24T13:41:33.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "German",
    "location": "Minsk, Yakuba Kolasa St 5-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      19,
      25
    ],
    "createdAt": "2025-07-24T18:59:52.000Z",
    "updatedAt": "2025-07-24T18:59:52.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Nadezhda",
    "location": "Smalyavichy, Mira St 2-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      8,
      15,
      23
    ],
    "createdAt": "2025-08-10T07:05:30.000Z",
    "updatedAt": "2025-08-10T07:05:30.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Yaroslav",
    "location": "Minsk, Surhanava St 12-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      18
    ],
    "createdAt": "2025-08-16T08:15:11.000Z",
    "updatedAt": "2025-08-16T08:15:11.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Inna",
    "location": "Minsk, Timiryazeva St 9-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      2,
      10,
      27
    ],
    "createdAt": "2025-08-09T12:44:39.000Z",
    "updatedAt": "2025-08-09T12:44:39.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Viktoria",
    "location": "Minsk, Gikalo St 6-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      9,
      21,
      24
    ],
    "createdAt": "2025-08-10T17:58:27.000Z",
    "updatedAt": "2025-08-10T17:58:27.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Alena",
    "location": "Minsk, Komsomolskaya St 7-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      5,
      16
    ],
    "createdAt": "2025-08-08T09:03:05.000Z",
    "updatedAt": "2025-08-08T09:03:05.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Oksana",
    "location": "Minsk, Rakovskaya St 14-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      3,
      20
    ],
    "createdAt": "2025-08-09T14:22:49.000Z",
    "updatedAt": "2025-08-09T14:22:49.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Timur",
    "location": "Minsk, Zaslavskaya St 2-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      12,
      18,
      23
    ],
    "createdAt": "2025-08-09T19:57:33.000Z",
    "updatedAt": "2025-08-09T19:57:33.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Denis",
    "location": "Minsk, Kalinina St 3-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      7,
      13
    ],
    "createdAt": "2025-08-02T07:41:10.000Z",
    "updatedAt": "2025-08-02T07:41:10.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Polina",
    "location": "Minsk, Revolyutsionnaya St 17-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      2,
      6,
      15
    ],
    "createdAt": "2025-08-01T12:10:55.000Z",
    "updatedAt": "2025-08-01T12:10:55.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Igor",
    "location": "Minsk, Platonova St 4-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      8,
      11,
      22
    ],
    "createdAt": "2025-08-02T18:23:32.000Z",
    "updatedAt": "2025-08-02T18:23:32.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Margarita",
    "location": "Zhodino, Mira St 9-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      14,
      24
    ],
    "createdAt": "2025-07-29T08:02:00.000Z",
    "updatedAt": "2025-07-29T08:02:00.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Olesya",
    "location": "Smalyavichy, Partizanskaya St 2-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      10
    ],
    "createdAt": "2025-07-29T13:19:20.000Z",
    "updatedAt": "2025-07-29T13:19:20.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Fedor",
    "location": "Minsk, Mayakovskogo St 18-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      9,
      21,
      27
    ],
    "createdAt": "2025-07-30T17:44:59.000Z",
    "updatedAt": "2025-07-30T17:44:59.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Alyona",
    "location": "Fanipol, Lesnaya St 7-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      3,
      5,
      12
    ],
    "createdAt": "2025-08-08T09:09:09.000Z",
    "updatedAt": "2025-08-08T09:09:09.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Bogdan",
    "location": "Zaslawye, Gagarina St 2-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      7,
      16
    ],
    "createdAt": "2025-08-09T12:34:56.000Z",
    "updatedAt": "2025-08-09T12:34:56.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Kristina",
    "location": "Minsk, Filimonova St 11-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      18,
      23
    ],
    "createdAt": "2025-08-07T19:20:30.000Z",
    "updatedAt": "2025-08-07T19:20:30.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Petr",
    "location": "Minsk, Kropotkina St 9-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      2,
      9
    ],
    "createdAt": "2025-08-07T08:02:44.000Z",
    "updatedAt": "2025-08-07T08:02:44.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Tatiana S.",
    "location": "Minsk, Bogdanovicha St 21-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      10,
      15,
      20
    ],
    "createdAt": "2025-08-07T13:30:01.000Z",
    "updatedAt": "2025-08-07T13:30:01.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Grigory",
    "location": "Minsk, Volgogradskaya St 4-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      12,
      26
    ],
    "createdAt": "2025-08-01T18:18:18.000Z",
    "updatedAt": "2025-08-01T18:18:18.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Raisa",
    "location": "Zhodino, Oktyabrskaya St 3-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      7,
      11
    ],
    "createdAt": "2025-08-01T09:00:00.000Z",
    "updatedAt": "2025-08-01T09:00:00.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Vadim",
    "location": "Smalyavichy, Sovetskaya St 8-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      14,
      19
    ],
    "createdAt": "2025-08-01T13:22:45.000Z",
    "updatedAt": "2025-08-01T13:22:45.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Zoya",
    "location": "Minsk, Kotovskogo St 6-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      5,
      16,
      25
    ],
    "createdAt": "2025-07-28T20:11:10.000Z",
    "updatedAt": "2025-07-28T20:11:10.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Stepan",
    "location": "Minsk, Nemiga St 22-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      3,
      12,
      21
    ],
    "createdAt": "2025-08-17T08:14:20.000Z",
    "updatedAt": "2025-08-17T08:14:20.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Irina V.",
    "location": "Minsk, Independence Ave 33-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      7,
      14
    ],
    "createdAt": "2025-08-18T09:55:02.000Z",
    "updatedAt": "2025-08-18T09:55:02.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Ruslan",
    "location": "Zhodino, Lenina St 4-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      2,
      8,
      25
    ],
    "createdAt": "2025-08-18T11:30:41.000Z",
    "updatedAt": "2025-08-18T11:30:41.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Karina",
    "location": "Smalyavichy, Sovetskaya St 19-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      10,
      13
    ],
    "createdAt": "2025-08-18T13:47:09.000Z",
    "updatedAt": "2025-08-18T13:47:09.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Oskar",
    "location": "Zaslawye, Kirova St 6-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      5,
      16
    ],
    "createdAt": "2025-07-27T16:12:33.000Z",
    "updatedAt": "2025-07-27T16:12:33.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Ulyana",
    "location": "Fanipol, Franziska Skoriny St 3-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      11,
      18,
      27
    ],
    "createdAt": "2025-07-28T18:20:18.000Z",
    "updatedAt": "2025-07-28T18:20:18.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Gleb",
    "location": "Minsk, Karla Marksa St 7-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      9,
      22
    ],
    "createdAt": "2025-07-23T20:41:55.000Z",
    "updatedAt": "2025-07-23T20:41:55.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Elvira",
    "location": "Minsk, Surhanava St 15-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      1,
      7,
      19
    ],
    "createdAt": "2025-07-23T09:05:30.000Z",
    "updatedAt": "2025-07-23T09:05:30.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Matvei",
    "location": "Minsk, Gikalo St 9-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      12,
      20
    ],
    "createdAt": "2025-07-23T19:44:44.000Z",
    "updatedAt": "2025-07-23T19:44:44.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Semen",
    "location": "Minsk, Internatsionalnaya St 3-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      6,
      17
    ],
    "createdAt": "2025-07-23T09:22:11.000Z",
    "updatedAt": "2025-07-23T09:22:11.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Roman",
    "location": "Minsk, Engelsa St 3-12",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      5,
      14,
      22
    ],
    "createdAt": "2025-07-22T09:12:00.000Z",
    "updatedAt": "2025-07-22T09:12:00.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Anastasia",
    "location": "Minsk, Kalvariyskaya St 19-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      7,
      9
    ],
    "createdAt": "2025-07-22T12:47:15.000Z",
    "updatedAt": "2025-07-22T12:47:15.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Kirill",
    "location": "Minsk, Pobediteley Ave 45-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      2,
      17,
      24
    ],
    "createdAt": "2025-07-23T19:03:44.000Z",
    "updatedAt": "2025-07-23T19:03:44.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Artem",
    "location": "Minsk, Dzerzhinskogo Ave 8-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      6,
      13
    ],
    "createdAt": "2025-07-22T08:26:10.000Z",
    "updatedAt": "2025-07-22T08:26:10.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Valeria",
    "location": "Minsk, Masherova Ave 22-10",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      12
    ],
    "createdAt": "2025-07-22T13:41:33.000Z",
    "updatedAt": "2025-07-22T13:41:33.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "German",
    "location": "Minsk, Yakuba Kolasa St 5-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      19,
      25
    ],
    "createdAt": "2025-07-22T18:59:52.000Z",
    "updatedAt": "2025-07-22T18:59:52.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Nadezhda",
    "location": "Smalyavichy, Mira St 2-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      8,
      15,
      23
    ],
    "createdAt": "2025-07-22T07:05:30.000Z",
    "updatedAt": "2025-07-22T07:05:30.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Yaroslav",
    "location": "Minsk, Surhanava St 12-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      18
    ],
    "createdAt": "2025-07-22T08:15:11.000Z",
    "updatedAt": "2025-07-22T08:15:11.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Inna",
    "location": "Minsk, Timiryazeva St 9-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      2,
      10,
      27
    ],
    "createdAt": "2025-07-20T12:44:39.000Z",
    "updatedAt": "2025-07-20T12:44:39.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Viktoria",
    "location": "Minsk, Gikalo St 6-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      9,
      21,
      24
    ],
    "createdAt": "2025-07-21T17:58:27.000Z",
    "updatedAt": "2025-07-21T17:58:27.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Alena",
    "location": "Minsk, Komsomolskaya St 7-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      5,
      16
    ],
    "createdAt": "2025-07-20T09:03:05.000Z",
    "updatedAt": "2025-07-20T09:03:05.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Oksana",
    "location": "Minsk, Rakovskaya St 14-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      3,
      20
    ],
    "createdAt": "2025-07-21T14:22:49.000Z",
    "updatedAt": "2025-07-21T14:22:49.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Timur",
    "location": "Minsk, Zaslavskaya St 2-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      12,
      18,
      23
    ],
    "createdAt": "2025-07-19T19:57:33.000Z",
    "updatedAt": "2025-07-19T19:57:33.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Denis",
    "location": "Minsk, Kalinina St 3-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      7,
      13
    ],
    "createdAt": "2025-07-18T07:41:10.000Z",
    "updatedAt": "2025-07-18T07:41:10.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Polina",
    "location": "Minsk, Revolyutsionnaya St 17-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      2,
      6,
      15
    ],
    "createdAt": "2025-07-18T12:10:55.000Z",
    "updatedAt": "2025-07-18T12:10:55.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Igor",
    "location": "Minsk, Platonova St 4-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      8,
      11,
      22
    ],
    "createdAt": "2025-07-19T18:23:32.000Z",
    "updatedAt": "2025-07-19T18:23:32.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Margarita",
    "location": "Zhodino, Mira St 9-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      14,
      24
    ],
    "createdAt": "2025-07-18T08:02:00.000Z",
    "updatedAt": "2025-07-18T08:02:00.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Olesya",
    "location": "Smalyavichy, Partizanskaya St 2-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      10
    ],
    "createdAt": "2025-07-18T13:19:20.000Z",
    "updatedAt": "2025-07-18T13:19:20.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Fedor",
    "location": "Minsk, Mayakovskogo St 18-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      9,
      21,
      27
    ],
    "createdAt": "2025-07-18T17:44:59.000Z",
    "updatedAt": "2025-07-18T17:44:59.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Alyona",
    "location": "Fanipol, Lesnaya St 7-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      3,
      5,
      12
    ],
    "createdAt": "2025-07-18T09:09:09.000Z",
    "updatedAt": "2025-07-18T09:09:09.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Bogdan",
    "location": "Zaslawye, Gagarina St 2-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      7,
      16
    ],
    "createdAt": "2025-07-17T12:34:56.000Z",
    "updatedAt": "2025-07-17T12:34:56.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Kristina",
    "location": "Minsk, Filimonova St 11-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      18,
      23
    ],
    "createdAt": "2025-07-17T19:20:30.000Z",
    "updatedAt": "2025-07-17T19:20:30.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Petr",
    "location": "Minsk, Kropotkina St 9-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      2,
      9
    ],
    "createdAt": "2025-07-16T08:02:44.000Z",
    "updatedAt": "2025-07-16T08:02:44.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Raisa",
    "location": "Zhodino, Oktyabrskaya St 3-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      7,
      11
    ],
    "createdAt": "2025-07-17T09:00:00.000Z",
    "updatedAt": "2025-07-17T09:00:00.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Vadim",
    "location": "Smalyavichy, Sovetskaya St 8-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      14,
      19
    ],
    "createdAt": "2025-07-16T13:22:45.000Z",
    "updatedAt": "2025-07-16T13:22:45.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Zoya",
    "location": "Minsk, Kotovskogo St 6-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      5,
      16,
      25
    ],
    "createdAt": "2025-07-16T20:11:10.000Z",
    "updatedAt": "2025-07-16T20:11:10.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Miroslava",
    "location": "Minsk, Nemiga St 18-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      3,
      8
    ],
    "createdAt": "2025-07-16T07:12:05.000Z",
    "updatedAt": "2025-07-16T07:12:05.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Arseny",
    "location": "Minsk, Independence Ave 27-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      6,
      17,
      22
    ],
    "createdAt": "2025-07-16T19:49:44.000Z",
    "updatedAt": "2025-07-16T19:49:44.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Elizaveta",
    "location": "Minsk, Yakuba Kolasa St 4-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      7,
      21
    ],
    "createdAt": "2025-07-15T08:33:21.000Z",
    "updatedAt": "2025-07-15T08:33:21.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Diana",
    "location": "Smalyavichy, Sovetskaya St 11-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      2,
      12,
      25
    ],
    "createdAt": "2025-07-16T14:05:10.000Z",
    "updatedAt": "2025-07-16T14:05:10.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Ilya",
    "location": "Zaslawye, Lenina St 8-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      5,
      9,
      24
    ],
    "createdAt": "2025-07-16T22:18:59.000Z",
    "updatedAt": "2025-07-16T22:18:59.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Nikita",
    "location": "Minsk, Timiryazeva St 4-2",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      1,
      14
    ],
    "createdAt": "2025-07-15T09:14:33.000Z",
    "updatedAt": "2025-07-15T09:14:33.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Alla",
    "location": "Minsk, Kalinina St 12-8",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      8,
      18,
      23
    ],
    "createdAt": "2025-07-15T20:40:02.000Z",
    "updatedAt": "2025-07-15T20:40:02.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Mark",
    "location": "Minsk, Masherova Ave 5-3",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      4,
      10
    ],
    "createdAt": "2025-07-15T17:02:40.000Z",
    "updatedAt": "2025-07-15T17:02:40.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Ksenia",
    "location": "Minsk, Komsomolskaya St 9-6",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      11,
      16
    ],
    "createdAt": "2025-07-15T18:03:55.000Z",
    "updatedAt": "2025-07-15T18:03:55.000Z",
    "status": "COMPLETED"
  },
  {
    "customer": "Georgy",
    "location": "Minsk, Internatsionalnaya St 6-4",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      3,
      20,
      27
    ],
    "createdAt": "2025-07-14T11:26:00.000Z",
    "updatedAt": "2025-07-14T11:26:00.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Rimma",
    "location": "Minsk, Karla Marksa St 16-7",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      6,
      7
    ],
    "createdAt": "2025-07-13T16:40:41.000Z",
    "updatedAt": "2025-07-13T16:40:41.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Sofya",
    "location": "Minsk, Surhanava St 20-1",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      2,
      13
    ],
    "createdAt": "2025-07-13T21:03:22.000Z",
    "updatedAt": "2025-07-13T21:03:22.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Taisia",
    "location": "Zhodino, Oktyabrskaya St 2-5",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 2
      }
    },
    "productIds": [
      5,
      15,
      23
    ],
    "createdAt": "2025-07-13T18:44:10.000Z",
    "updatedAt": "2025-07-13T18:44:10.000Z",
    "status": "CANCELLED"
  },
  {
    "customer": "Yakov",
    "location": "Minsk, Pobediteley Ave 51-9",
    "Deliveryman": {
      "connect": {
        "id": 3
      }
    },
    "Manager": {
      "connect": {
        "id": 1
      }
    },
    "productIds": [
      1,
      22,
      24
    ],
    "createdAt": "2025-07-14T23:55:40.000Z",
    "updatedAt": "2025-07-14T23:55:40.000Z",
    "status": "CANCELLED"
  }
]
