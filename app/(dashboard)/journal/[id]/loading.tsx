import Spinner from "@/components/Spinner";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner width={"50px"} height={"50px"} />
    </div>
  );
};

export default Loading;
