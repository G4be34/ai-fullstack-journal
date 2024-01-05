import { EntryType } from "@/utils/types";

const EntryCard = ({ entry }: { entry: EntryType }) => {
  const date = new Date(entry.createdAt).toDateString();
  const { subject, mood, color } = entry.analysis!;

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className=" flex px-4 py-5 sm:p-6 justify-between items-center">
        <div>{date}</div>
        <div
          className="h-7 w-7 rounded-full border border-black border-solid"
          style={{ backgroundColor: color }}
        />
      </div>
      <div className="px-4 py-5 sm:p-6">{subject}</div>
      <div className="px-4 py-5 sm:p-6">
        {mood[0].toUpperCase() + mood.slice(1)}
      </div>
    </div>
  );
};

export default EntryCard;
