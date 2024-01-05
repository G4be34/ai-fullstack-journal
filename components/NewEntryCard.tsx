"use client";

import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

type NewEntryCardPropsType = {
  setIsLoading: (isLoading: boolean) => void;
};

const NewEntryCard = ({ setIsLoading }: NewEntryCardPropsType) => {
  const router = useRouter();
  const handleOnClick = async () => {
    setIsLoading(true);
    const data = await createNewEntry();
    setIsLoading(false);
    router.push(`/journal/${data.id}`);
  };

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
      onClick={handleOnClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
};

export default NewEntryCard;
