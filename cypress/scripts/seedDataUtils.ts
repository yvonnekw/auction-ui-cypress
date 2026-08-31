import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { User } from '../../models/user';

const prisma = new PrismaClient();

const seedFilePath = path.resolve(__dirname, '../data/database-seeding.json');
const seedData = JSON.parse(fs.readFileSync(seedFilePath, 'utf-8'));

export const createFakeUser = (): User => {
   const password = generatePassword()
    return {
        username: faker.internet.username(),
        password: password,
        confirmPassword: password,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email()
        // telephone: faker.phone.number(), // Generate a random phone number
    };
};

const seedFakeUsers = async (numberOfUsers: number) => {
    const users = Array.from({ length: numberOfUsers }, createFakeUser);

    console.log('Seeding Users...');
    await prisma.user.createMany({
        data: users,
    });

    console.log('Users seeded successfully.');
};

async function seedDatabase() {
    try {
        await seedFakeUsers(10);
        console.log('Seeding completed.');

        console.log('Seeding Products...');
        for (const product of seedData.products) {
            await prisma.product.create({
                data: product,
            });
        }

        console.log('Database seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export const generatePassword = (): string => {
    const randomNumber = Math.floor(10 + Math.random() * 90); // Generates a number between 10 and 99
    return `pwd${randomNumber}`;
};

if (require.main === module) {
    seedDatabase();
}

export default seedDatabase;
