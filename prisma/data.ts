import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";

type createUserParams = Prisma.UserCreateManyInput;
type createTodoParams = Prisma.TodoCreateManyInput;
type createTagParams = Prisma.TagCreateManyInput;
type createUpdatedLogParams = Prisma.UpdatedLogCreateManyInput;
type createFollowParams = Prisma.FollowCreateManyInput;

export function seedData() {
  const createManyUserParams = [...Array(10)].map(() => ({
    id: faker.string.uuid(),
    name: faker.name.fullName(),
    githubUrl: faker.helpers.arrayElement([null, faker.internet.url()]),
    zennUrl: faker.helpers.arrayElement([null, faker.internet.url()]),
    quitaUrl: faker.helpers.arrayElement([null, faker.internet.url()]),
    email: faker.internet.email(),
    emailVerified: faker.date.recent(),
    image: faker.image.avatar(),
    private: faker.datatype.boolean(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  })) satisfies createUserParams[];

  const createManyTodoParams = [...Array(10)].map((value, i) => ({
    url: faker.internet.url(),
    status: faker.helpers.arrayElement(["TODO", "COMPLETED"]),
    userId: faker.helpers.arrayElement(
      createManyUserParams.map((item) => item.id)
    ),
    content: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  })) satisfies createTodoParams[];

  const createManyTagParams = [...Array(10)].map(() => ({
    name: faker.lorem.word(),
    userId: faker.helpers.arrayElement(
      createManyUserParams.map((item) => item.id)
    ),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  })) satisfies createTagParams[];

  const createManyUpdatedLogParams = [...Array(10)].map((_, i) => ({
    userId: faker.helpers.arrayElement(
      createManyUserParams.map((item) => item.id)
    ),
    todoId: i,
    actionType: faker.helpers.arrayElement(["CREATE", "COMPLETE"]),
  })) satisfies createUpdatedLogParams[];

  const userId = faker.helpers.arrayElement(
    createManyUserParams.map((item) => item.id)
  );
  const createManyFollowParams = [...Array(10)].map((_, i) => ({
    userId: i.toString(),
    followUserId: (i + 1).toString(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  })) satisfies createFollowParams[];

  return {
    createManyUserParams,
    createManyTodoParams,
    createManyTagParams,
    createManyUpdatedLogParams,
    createManyFollowParams,
  };
}
