import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { validate } from "@/src/lib/validate";
import {
  createTagSchema,
  updateTagSchema,
  deleteTagSchema,
} from "./_validationSchema";
import { PostTagUseCase } from "@/src/server/useCase/PostTagUseCase";
import { PostTagRepositoryImpl } from "@/src/server/repositories/PostTagRepository";
import { auth } from "@/src/auth";
import { Tag } from "@/src/server/domain/entities/Tag";
import { PutTagUseCase } from "@/src/server/useCase/PutTagUseCase";
import { PutTagRepositoryImpl } from "@/src/server/repositories/PutTagRepositoryImpl";
import { DeleteTagUseCase } from "@/src/server/useCase/DeleteTagUseCase";
import { DeleteTagRepositoryImpl } from "@/src/server/repositories/DeleteTagRepository";

export async function POST(req: NextRequest) {
  try {
    const [{ name }, user] = await Promise.all([
      validate(createTagSchema, await req.json()),
      auth(),
    ]);

    const useCase = new PostTagUseCase(new PostTagRepositoryImpl(prisma));
    await useCase.execute(user, Tag.create({ name }));

    return NextResponse.json({ message: "created" });
  } catch (e) {
    return NextResponse.json(e);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const [{ name, tagId }, user] = await Promise.all([
      validate(updateTagSchema, await req.json()),
      auth(),
    ]);

    const useCase = new PutTagUseCase(new PutTagRepositoryImpl(prisma));
    await useCase.execute(user, Tag.reconstruct({ name, id: tagId }));

    return NextResponse.json({ message: "updated" });
  } catch (e) {
    return NextResponse.json(e);
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const [{ tagId }, user] = await Promise.all([
      validate(deleteTagSchema, await req.json()),
      auth(),
    ]);

    const useCase = new DeleteTagUseCase(new DeleteTagRepositoryImpl(prisma));
    await useCase.execute(user, tagId);

    return NextResponse.json({ message: "deleted" });
  } catch (e) {
    return NextResponse.json(e);
  }
}
