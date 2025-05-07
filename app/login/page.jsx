"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Reverted to sonner import

const Login = () => {
  const { signIn, setActive, isLoaded: isSignInLoaded } = useSignIn();
  const { user, isLoaded: isUserLoaded } = useUser();
  const router = useRouter();
  // Removed useToast hook, sonner is used directly

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isUserLoaded && user) {
      toast("Already Logged In", {
        // Updated toast call for sonner
        description: "Redirecting you to the dashboard...",
      });
      router.push("/dashboard");
    }
  }, [isUserLoaded, user, router]); // Removed toast from dependency array

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isSignInLoaded || isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard"); // Use router for navigation
        toast.success("Login Successful!", {
          // Updated toast call for sonner
          description: "Welcome back to ZenFlow.",
        });
      } else {
        console.log("Clerk sign in status:", result.status);
        const firstErrorMessage =
          "Login failed. Please check your credentials or sign up if you don't have an account.";
        setError(firstErrorMessage);
        toast.error("Login Failed", { description: firstErrorMessage }); // Updated toast call
      }
    } catch (err) {
      const firstErrorMessage =
        err.errors?.[0]?.longMessage ||
        err.errors?.[0]?.message ||
        "Login Failed";
      setError(firstErrorMessage);
      toast.error("Login Failed", { description: firstErrorMessage }); // Updated toast call
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Image section */}
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/login-bg.jpeg"
          alt="ZenFlow background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-gray-600">
              Log in to continue your ZenFlow journey.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            {/* Clerk CAPTCHA might be required here if enabled in your Clerk dashboard for login */}
            {/* <div id="clerk-captcha"></div> */}

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
