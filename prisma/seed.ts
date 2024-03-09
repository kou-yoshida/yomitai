import { PrismaClient } from "@prisma/client";
import { seedData } from "./data";

const seedingPrisma = new PrismaClient();

const load = async () => {
  try {
    const {
      createManyUserParams,
      createManyTodoParams,
      createManyTagParams,
      createManyUpdatedLogParams,
      createManyFollowParams,
    } = seedData();

    await seedingPrisma.tag.deleteMany();
    // // await seedingPrisma.$queryRaw`ALTER TABLE Tag AUTO_INCREMENT = 1`;

    await seedingPrisma.updatedLog.deleteMany();
    // // await seedingPrisma.$queryRaw`ALTER TABLE UpdatedLog AUTO_INCREMENT = 1`;

    await seedingPrisma.todo.deleteMany();
    // // await seedingPrisma.$queryRaw`ALTER TABLE Todo AUTO_INCREMENT = 1`;

    await seedingPrisma.follow.deleteMany();
    // // await seedingPrisma.$queryRaw`ALTER TABLE Follow AUTO_INCREMENT = 1`;

    await seedingPrisma.user.deleteMany();
    // // await seedingPrisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;

    await seedingPrisma.user.createMany({
      data: createManyUserParams,
    });

    await seedingPrisma.todo.createMany({
      data: createManyTodoParams,
    });

    await seedingPrisma.tag.createMany({
      data: createManyTagParams,
    });

    await seedingPrisma.updatedLog.createMany({
      data: createManyUpdatedLogParams,
    });

    await seedingPrisma.follow.createMany({
      data: createManyFollowParams,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await seedingPrisma.$disconnect();
  }
};
load();
