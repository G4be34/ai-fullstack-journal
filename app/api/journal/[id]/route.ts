import { analyze } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { content } = await request.json();
  const user = await getUserByClerkID();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });

  const analysis = await analyze(updatedEntry.content);

  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      sentimentScore: analysis?.sentimentScore,
      mood: analysis?.mood || "",
      summary: analysis?.summary || "",
      subject: analysis?.subject || "",
      negative: analysis?.negative || false,
      color: analysis?.color || "",
    },
    update: {
      sentimentScore: analysis?.sentimentScore,
      mood: analysis?.mood,
      summary: analysis?.summary,
      subject: analysis?.subject,
      negative: analysis?.negative,
      color: analysis?.color,
    },
  });

  return NextResponse.json({ data: { ...updatedEntry, analysis: updated } });
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const user = await getUserByClerkID();
    await prisma.journalEntry.delete({
      where: {
        userId_id: {
          userId: user.id,
          id: params.id,
        },
      },
    });
    revalidatePath("/journal");

    return NextResponse.json(
      { message: "Entry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting entry from database:", error);
  }
};
