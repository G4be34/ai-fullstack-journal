"use client";

import { deleteEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  id: string;
  setIsDeleting: (value: boolean) => void;
};

const DeleteButton = ({ id, setIsDeleting }: DeleteButtonProps) => {
  const router = useRouter();
  const handleDelete = async (entryId: string) => {
    setIsDeleting(true);
    await deleteEntry(entryId);
    setIsDeleting(false);
    router.push("/journal");
  };

  return (
    <button
      className="px-4 py-2 rounded-lg text-xl cursor-pointer"
      style={{ backgroundColor: "rgb(237, 55, 40)" }}
      onClick={() => handleDelete(id)}
    >
      Delete Journal Entry
    </button>
  );
};

export default DeleteButton;
