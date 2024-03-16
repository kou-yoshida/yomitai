import { auth } from "@/src/auth";
import { GetProfileRepositoryImpl } from "@/src/server/repositories/GetProfileRepositoryImpl";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { GetProfileUseCase } from "@/src/server/useCase/GetProfileUseCase";
import { putProfileRequestSchema } from "./_validationSchema";
import { PutProfileUseCase } from "@/src/server/useCase/PutProfileUseCase";
import { PutProfileRepositoryImpl } from "@/src/server/repositories/PutProfileRepositoryImpl";
import { ProfilePutDto } from "@/src/server/domain/dto/ProfilePutDto";

/**
 * ユーザー自身のプロフィール情報取得API（リアルタイム性が必要な為APIとして公開）
 */
export async function GET(request: Request) {
  try {
    const { user } = await auth();

    const useCase = new GetProfileUseCase(new GetProfileRepositoryImpl(prisma));
    const profile = (await useCase.execute(user.id))?.toObject();

    return NextResponse.json({ profile });
  } catch (e) {
    return NextResponse.json(e);
  }
}

/**
 * ユーザー自身のプロフィール情報更新API
 */
export async function PUT(request: Request) {
  try {
    const { user } = await auth();
    const requestBody = putProfileRequestSchema.parse(await request.json());
    const dto = ProfilePutDto.fromRequest(requestBody);

    const useCase = new PutProfileUseCase(new PutProfileRepositoryImpl(prisma));
    const result = (await useCase.execute(user.id, dto)).toObject();

    return NextResponse.json({ result });
  } catch (e) {
    return NextResponse.json(e);
  }
}
