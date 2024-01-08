"use client";

type InfoModalPropType = {
  closeModal: () => void;
};

const InfoModal = ({ closeModal }: InfoModalPropType) => {
  return (
    <dialog open className="rounded-lg p-6">
      <h1 className="text-2xl text-center font-bold">
        Welcome to AI Mood Journal!
      </h1>
      <h2 className="text-xl my-4 font-bold">How to get started:</h2>
      <ol className="list-disc list-inside space-y-2">
        <li>
          Click the New Entry button to generate a new journal entry with some
          default statistics
        </li>
        <li>
          Write down your thoughts and watch as the AI analyzes and updates the
          entrys color and mood in real time!
        </li>
        <li>
          Ask the AI questions about your journal entries in the Journal page
          <ul className="list-inside">
            <li className="indent-8">
              - i.e. How have I been feeling the last few days?
            </li>
          </ul>
        </li>
        <li>
          Click on the History page to view the trend of your moods over time
        </li>
        <li>
          If you ever want to Sign Out, change your password/email or delete
          your account, click on the profile image at the top right of the page
        </li>
      </ol>
      <div className="flex justify-center mt-6">
        <button
          onClick={closeModal}
          className="bg-blue-400 px-4 py-2 rounded-lg text-l my-2"
        >
          Got it!
        </button>
      </div>
    </dialog>
  );
};

export default InfoModal;
