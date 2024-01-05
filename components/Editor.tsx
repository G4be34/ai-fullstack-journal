"use client";

import { updateEntry } from "@/utils/api";
import { EntryType } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import DeleteButton from "./DeleteButton";
import Spinner from "./Spinner";

const Editor = ({ entry }: { entry: EntryType }) => {
  const [value, setValue] = useState(entry.content);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);
  const router = useRouter();

  useAutosave({
    data: value,
    onSave: async (_value) => {
      if (!isDeleting) {
        setIsSaving(true);
        const data = await updateEntry(entry.id, _value);
        setAnalysis(data.analysis);
        setIsSaving(false);
      }
    },
    saveOnUnmount: false,
  });

  if (!analysis) {
    return null;
  }

  const { mood, summary, color, subject, negative } = analysis;
  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood[0].toUpperCase() + mood.slice(1) },
    { name: "Negative", value: negative ? "True" : "False" },
  ];

  return (
    <div className="w-full h-full grid grid-cols-3 gap-0 relative">
      <div className="absolute left-0 top-0 p-2">
        {isSaving ? (
          <Spinner width={"16px"} height={"16px"} />
        ) : (
          <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
        )}
      </div>
      <div className="col-span-2">
        <textarea
          className="w-full h-full p-8 text-xl "
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="border-l border-black/5">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((data) => (
              <li
                className="flex items-center justify-between px-2 py-4 border-b border-t border-black/10"
                key={data.name}
              >
                <span className="text-lg font-semibold">{data.name}</span>
                <span className="ml-2 text-center">{data.value}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-8">
            {!isDeleting ? (
              <DeleteButton id={entry.id} setIsDeleting={setIsDeleting} />
            ) : (
              <button
                className="px-4 py-2 rounded-lg text-xl cursor-pointer"
                style={{ backgroundColor: "rgb(237, 55, 40)" }}
              >
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
