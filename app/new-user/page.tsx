import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  try {
    const user = await currentUser();

    const match = await prisma.user.findUnique({
      where: {
        clerkId: user.id as string,
      },
    });

    if (!match) {
      await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user?.emailAddresses[0].emailAddress,
        },
      });
    }
  } catch (error) {
    console.error("Error creating new user:", error);
    throw new Error(error);
  }
  redirect("/journal");
};

const NewUser = async () => {
  await createNewUser();

  return <div>...Loading</div>;
};

export default NewUser;
