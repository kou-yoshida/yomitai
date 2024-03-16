import { auth } from "@/src/auth";
import { GetProfileRepositoryImpl } from "@/src/server/repositories/GetProfileRepositoryImpl";
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { GetProfileUseCase } from "@/src/server/useCase/GetProfileUseCase";

/**
 * ユーザー自身のプロフィール情報取得API（リアルタイム性が必要な為APIとして公開）
 */
export async function GET(request: Request) {
  const { user } = await auth();

  const useCase = new GetProfileUseCase(new GetProfileRepositoryImpl(prisma));
  const profile = await useCase.execute(user.id);

  return NextResponse.json({ profile });
}

/**
 * ユーザー自身のプロフィール情報更新API
 */
export async function PUT(request: Request) {
  // paramsのバリデーション
  // useCaseの呼び出し
  // responseを返却
}
