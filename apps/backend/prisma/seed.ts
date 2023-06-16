import { PrismaClient, UserRole } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from '../src/app/users/user.constant';

const prisma = new PrismaClient();

async function fillDb() {
  const salt = await genSalt(SALT_ROUNDS);
  const password = await hash('admin', salt);

  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      email: 'admin@notify.local',
      password,
      name: 'admin',
      role: UserRole.Admin,
    }
  });
  await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      email: 'boris@notify.local',
      password: '123456',
      name: 'Boris',
    }
  });
  await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Framus',
      description: 'Electric guitar with oil finish',
      photo: 'default.jpg',
      guitarType: "Electric",
      article: '123456789',
      stringsCount: 6,
      price: 1000,
    }
  });
  await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Fender',
      description: 'This is ukulele',
      photo: 'default.jpg',
      guitarType: "Ukulele",
      article: '123456789',
      stringsCount: 6,
      price: 200,
    }
  });
  await prisma.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Ibanez',
      description: 'This is acoustic guitar',
      photo: 'default.jpg',
      guitarType: "Acoustic",
      article: '123456789',
      stringsCount: 6,
      price: 500,
    }
  });
  console.info('🤘️ Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
