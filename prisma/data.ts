import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { create } from "domain";

type createUserParams = Prisma.UserCreateManyInput;
type createTodoParams = Prisma.TodoCreateManyInput;
type createTagParams = Prisma.TagCreateManyInput;
type createUpdatedLogParams = Prisma.UpdatedLogCreateManyInput;
type createFollowFollowedParams = Prisma.FollowFollowedCreateManyInput;

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
    id: faker.string.uuid(),
    url: faker.internet.url(),
    status: faker.helpers.arrayElement(["COMPLETED", "SUSPENDED"]),
    userId: faker.helpers.arrayElement(
      createManyUserParams.map((item) => item.id)
    ),
    content: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  })) satisfies createTodoParams[];

  const createManyTagParams = [...Array(10)].map((_, i) => ({
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    userId: faker.helpers.arrayElement(
      createManyUserParams.map((item) => item.id)
    ),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  })) satisfies createTagParams[];

  const createManyUpdatedLogParams = [...Array(10)].map((_, i) => ({
    userId: createManyUserParams[i].id,
    todoId: createManyTodoParams[i].id,
    actionType: faker.helpers.arrayElement(["CREATE", "COMPLETE"]),
  })) satisfies createUpdatedLogParams[];

  const createManyFollowParams = [...Array(10)].map((_, i) => ({
    followedUserId: faker.helpers.arrayElement(
      createManyUserParams.map((item) => item.id)
    ),
    followUserId: faker.helpers.arrayElement(
      createManyUserParams.map((item) => item.id)
    ),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  })) satisfies createFollowFollowedParams[];

  return {
    createManyUserParams,
    createManyTodoParams,
    createManyTagParams,
    createManyUpdatedLogParams,
    createManyFollowParams,
  };
}
