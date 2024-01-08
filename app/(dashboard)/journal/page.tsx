"use client";

import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Question from "@/components/Question";
import Spinner from "@/components/Spinner";
import { getEntries } from "@/utils/api";
import { EntryType } from "@/utils/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const JournalPage = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const entries = await getEntries();
        setEntries(entries);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    setIsLoading(true);
    fetchEntries();
  }, []);

  return (
    <div className="p-10 bg-zinc-400/10 h-full overflow-auto">
      <h2 className="text-3xl mb-8">Journal Entries</h2>
      <div className="my-8">
        <Question />
      </div>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <Spinner width={"50px"} height={"50px"} />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        <NewEntryCard setIsLoading={setIsLoading} />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
