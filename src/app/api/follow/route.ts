import { auth } from "@/src/auth";
import { NextResponse } from "next/server";
import {
  deleteFollowParamsSchema,
  postFollowParamsSchema,
} from "./_validationSchema";
import { validate } from "@/src/lib/validate";
import { PostFollowUseCase } from "@/src/server/useCase/PostFollowUseCase";
import { PostFollowRepositoryImpl } from "@/src/server/repositories/PostFollowRepositoryImpl";
import { prisma } from "@/src/lib/prisma";
import { DeleteFollowRepositoryImpl } from "@/src/server/repositories/DeleteFollowRepositoryImpl";
import { DeleteFollowUseCase } from "@/src/server/useCase/DeleteFollowUseCase";

export async function GET(req: Request) {
  try {
    const user = await auth();
    const { userId } = await validate(postFollowParamsSchema, await req.json());

    const useCase = new PostFollowUseCase(new PostFollowRepositoryImpl(prisma));

    await useCase.execute(user, userId);

    return NextResponse.json({
      result: "success",
    });
  } catch (e) {
    return NextResponse.json(e);
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await auth();
    const { userId } = await validate(
      deleteFollowParamsSchema,
      await req.json()
    );

    const useCase = new DeleteFollowUseCase(
      new DeleteFollowRepositoryImpl(prisma)
    );

    await useCase.execute(user, userId);

    return NextResponse.json({
      result: "success",
    });
  } catch (e) {
    return NextResponse.json(e);
  }
}
