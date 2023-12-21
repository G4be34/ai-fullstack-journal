import { deleteEntry } from "@/utils/api";
import Link from "next/link";

const DeleteButton = ({ id }) => {
  const handleDelete = async (entryId) => {
    await deleteEntry(entryId);
  };

  return (
    <Link href={"/journal"}>
      <button
        className="px-4 py-2 rounded-lg text-xl cursor-pointer"
        style={{ backgroundColor: "rgb(237, 55, 40)" }}
      >
        Delete Journal Entry
      </button>
    </Link>
  );
};

export default DeleteButton;
