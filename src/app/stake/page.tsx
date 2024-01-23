"use client";

import { useState } from "react";
import StakeForm from "./_lib/components/form";
import StakeSuccess from "./_lib/components/success";
import { formatEther, parseEther } from "viem";
import { useAccount, useConnect } from "wagmi";
import { useDisconnect } from "wagmi";

const Stake = () => {
  const [stakeStatus, setStakeStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [txHash, setTxHash] = useState<string | null>("");
  const [amount, setAmount] = useState<bigint>(parseEther("0"));
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="shadow-card flex items-center justify-center mx-10 my-5 bg-white rounded-xl">
      <h2>Connect</h2>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
      <div>{status}</div>
      {stakeStatus === "idle" && (
        <StakeForm
          amount={amount}
          setStakeStatus={setStakeStatus}
          setAmount={setAmount}
          setTxHash={setTxHash}
        />
      )}
      {stakeStatus === "success" && txHash && (
        <StakeSuccess txHash={txHash} amount={Number(formatEther(amount))} />
      )}
    </div>
  );
};

export default Stake;
