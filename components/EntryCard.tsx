const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();
  const { subject, mood } = entry.analysis;

  console.log("This is entry: ", entry);

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6">{date}</div>
      <div className="px-4 py-5 sm:p-6">{subject}</div>
      <div className="px-4 py-5 sm:p-6">{mood}</div>
    </div>
  );
};

export default EntryCard;
