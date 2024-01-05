import { analyze } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkID();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "",
    },
  });

  const analysis = await analyze(entry.content);
  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      sentimentScore: analysis?.sentimentScore || 0,
      mood: analysis?.mood || "",
      summary: analysis?.summary || "",
      subject: analysis?.subject || "",
      negative: analysis?.negative || false,
      color: analysis?.color || "",
    },
  });

  revalidatePath("/journal");

  return NextResponse.json({ data: entry });
};

export const GET = async () => {
  try {
    const user = await getUserByClerkID();
    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        analysis: true,
      },
    });

    return NextResponse.json({ data: entries });
  } catch (error) {
    console.error("Error fetching entries from database:", error);
  }
};
