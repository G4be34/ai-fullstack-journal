"use client";

import { askQuestion } from "@/utils/api";
import { useState } from "react";
import Spinner from "./Spinner";

const Question = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const answer = await askQuestion(value);

    setResponse(answer);
    setValue("");
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          disabled={loading}
          type="text"
          className="border border-black/20 px-4 py-2 text-lg rounded-lg mr-4 w-[550px]"
          value={value}
          onChange={onChange}
          placeholder="Ask a question"
        />
        <button
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>
      {loading && (
        <div className="mt-4">
          <Spinner width={"16px"} height={"16px"} />
        </div>
      )}
      {response && <div className="mt-4">{response}</div>}
    </div>
  );
};

export default Question;
