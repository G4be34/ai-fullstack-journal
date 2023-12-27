"use client";

import { verifyUser } from "@/utils/api";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwMatch, setPwMatch] = useState(true);
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [foundUser, setFoundUser] = useState(true);
  const [regexFailed, setRegexFailed] = useState(false);
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  async function create(e: SyntheticEvent) {
    e.preventDefault();

    const user = await verifyUser(email);

    if (!user) {
      setFoundUser(false);
      return;
    }

    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
      })
      .catch((err) => console.error("error", err.errors[0].longMessage));
  }

  async function reset(e: SyntheticEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPwMatch(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      setRegexFailed(true);
      return;
    }

    setRegexFailed(false);
    setPwMatch(true);
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
        } else {
          console.log(result);
        }
      })
      .catch((err) => console.error("error", err));
    router.push("/");
  }

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[500px] mx-auto bg-white/10 p-8 rounded-lg">
        <div className="flex justify-center mb-6">
          <h1 className="text-3xl">Forgot Password?</h1>
        </div>
        <form
          style={{
            gap: "1em",
          }}
          className="flex flex-col"
          onSubmit={!successfulCreation ? create : reset}
        >
          {!successfulCreation && !complete && (
            <>
              <div className="flex justify-center">
                <label htmlFor="email">Please provide your Email Address</label>
              </div>
              <input
                type="email"
                placeholder="e.g john@doe.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md p-2 text-black mb-2"
                id="email"
              />
              {!foundUser && (
                <div className="text-red-400">Email not found</div>
              )}
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-lg text-xl max-w-[150px] mx-auto"
              >
                Send Email
              </button>
            </>
          )}

          {successfulCreation && !complete && (
            <>
              <label htmlFor="password">New password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md p-2 text-black mt-[-0.5rem]"
                id="password"
              />

              <label htmlFor="confirm">Confirm new password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-md p-2 text-black mt-[-0.5rem]"
                id="confirm"
              />

              <label htmlFor="code">Reset password code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="rounded-md p-2 text-black mb-4 mt-[-0.5rem]"
                id="code"
              />
              {!pwMatch && (
                <div className="text-red-400">Passwords do not match</div>
              )}
              {regexFailed && (
                <div className="text-red-400">
                  Passwords must have at least 8 characters, 1 number and 1
                  special character
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-lg text-xl max-w-[200px] mx-auto"
              >
                Reset Password
              </button>
            </>
          )}

          {complete && (
            <div className="text-green-400 flex justify-center">
              You successfully changed you password
            </div>
          )}
          {secondFactor && "2FA is required, this UI does not handle that"}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
