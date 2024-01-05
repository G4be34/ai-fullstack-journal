import Editor from "@/components/Editor";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

type EntryPageParams = {
  params: {
    id: string;
  };
};

const getEntry = async (id: string) => {
  const user = await getUserByClerkID();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};

const EntryPage = async ({ params }: EntryPageParams) => {
  const entry = await getEntry(params.id)!;

  if (!entry) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Entry not found
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  );
};

export default EntryPage;
