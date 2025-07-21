"use client";
export function AuthPage({ isSignin }: { isSignin: boolean }) {
  function HandleSubmit() {}
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-6 rounded-xl bg-yellow-900">
        <div className="bg-amber-50 text-black rounded-xl m-1">
          <input className="p-2" type="text" placeholder="Email" />
        </div>
        <div className="bg-amber-50 text-black rounded-xl m-1">
          <input className="p-2" type="password" placeholder="Password" />
        </div>
        <div className="flex justify-center items-center p-2 bg-amber-50 text-black rounded-xl m1">
          <button onClick={HandleSubmit}>
            {isSignin ? "Signin" : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}
