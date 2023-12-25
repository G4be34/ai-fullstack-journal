import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center flex-col">
      <SignIn />
      <div className="text-white/60 mt-4 flex justify-center items-center">
        <p>Forgot your password?</p>
        <Link href="../../forgot-password" className="text-blue-600 ml-2">
          Reset it here
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
