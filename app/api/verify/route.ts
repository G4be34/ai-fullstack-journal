import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const email = request.nextUrl.searchParams.get("email");
  console.log("Search email: ", email);
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return NextResponse.json({ data: user });
};
