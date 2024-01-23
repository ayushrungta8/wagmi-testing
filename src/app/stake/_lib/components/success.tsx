import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { getShortAddress } from '@/common/components/Web3Button';
// import copyIcon from "@/assets/icons/copy.svg";
const StakeSuccess = ({
  txHash,
  amount,
}: {
  txHash: string;
  amount: number;
}) => {
  return (
    <div className="p-5 pb-12 gap-4 w-full max-w-md flex flex-col justify-center">
      <span className="text-center font-bold text-3xl mb-8">Pool Ethereum</span>
      <div className="flex justify-center items-center">
        {/* <Image src={checkRounded} className="w-12 h-auto" alt="check-rounded" /> */}
      </div>
      <span className="text-center font-bold text-4xl">
        Your {amount} ETH is staked
      </span>
      <span>
        Rewards are distributed weekly. You will start earning rewards in 1
        week.
      </span>
      <div className=" bg-opus-teal/10 px-8 py-3 border border-opus-teal rounded-2xl flex justify-center items-center gap-4 text-opus-teal">
        Trx ID: {txHash}
        {/* <Image
          src={copyIcon}
          alt="copy"
          className="w-4 h-auto cursor-pointer active:hover:scale-90"
          onClick={() => {
            navigator.clipboard.writeText(txHash);
          }}
        /> */}
      </div>
      <div className="mt-8">
        If you would like to convert your ETH to liquid stake, you can continue
        with minting osETH.
      </div>
      <Link
        href="/mint"
        className="p-4 border btn rounded-btn-full bg-opus-teal cursor-pointer text-center"
      >
        Mint osETH
      </Link>
      <a
        href={`https://holesky.etherscan.io/tx/${txHash}`}
        className="p-4 mt-3 border rounded-btn-full cursor-pointer text-center"
        target="_blank"
        rel="noreferrer"
      >
        Go to Etherscan
      </a>
      <Link
        href=""
        className="p-4 mt-3 border rounded-btn-full cursor-pointer text-center"
      >
        Back to dashboard
      </Link>
    </div>
  );
};

export default StakeSuccess;
