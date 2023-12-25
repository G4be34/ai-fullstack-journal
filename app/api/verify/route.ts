import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { email } = await request.json();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return NextResponse.json({ data: user });
};
