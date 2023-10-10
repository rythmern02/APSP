import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import Link from "next/Link";

export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-between p-4 md:p-8 lg:p-12">
      <div className="text-white text-center flex  lg:mx-4 justify-center items-center">
        
        <h1 className="font-bold p-6 flex-grow-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">Welcome to APSP</h1>
        
        <div className="mt-4 flex-grow-0 ml-auto">
          <ConnectWallet
            dropdownPosition={{
              side: "bottom",
              align: "center",
            }}
          />
        </div>
      </div>
      <div className="mt4">
        <h2 className="text-center  text-xl sm:text-2xl md:text-3xl lg:text-4xl shadow-sm font-bold justify-center xl:text-5xl text-orange-600 ">
          [An Anonymous Platform For Proof Submission]
        </h2>
      </div>
      <div className="flex flex-col items-end mt-4">
        <Link href={"/submitE"}>
          <button className="hover:bg-orange-600 bg-orange-400 text-white rounded-lg mb-4 px-6 py-3 text-lg">
            Submit An Evidence
          </button>
        </Link>
        {/* <Link href={"/validate"}>
          <button className="hover:bg-orange-600 bg-orange-400 text-white rounded-lg mb-4 px-6 py-3 text-lg">
            Validate Evidences
          </button>
        </Link> */}
        <Link href={"/becomeValidator"}>
          <button className="hover:bg-orange-600 bg-orange-400 text-white rounded-lg mb-4 px-6 py-3 text-lg">
            Become A Validator
          </button>
        </Link>
        <Link href={"/evidences"}>
          <button className="hover:bg-orange-600 bg-orange-400 text-white rounded-lg px-6 py-3 text-lg">
            Surf Evidences
          </button>
        </Link>
      </div>
    </main>
  );
}
