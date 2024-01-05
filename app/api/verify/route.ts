import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const email = request.nextUrl.searchParams.get("email")!;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return NextResponse.json({ data: user });
};
