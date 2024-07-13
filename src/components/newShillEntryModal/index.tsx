import React from "react";
import XSvg from "~/components/svg/xSvg";
import IFrameSvg from "~/components/svg/iFrameSvg";
import SimpleSearchInput from "~/components/simpleSearchInput";
import { toastUtil } from "~/components/toast";
import { storeNewTweetWithoutChainId } from "~/requests/tweets";
import { extractTwitterId } from "~/utils/twitter";
import { useQuery } from "@tanstack/react-query";
import { formatAddress, isValidAddress } from "~/utils/crypto";
import { fetchTokenByAddress } from "~/requests/tokens";
import { Token, ZERO_TOKEN } from "~/interfaces/responses";
import { cn } from "~/utils/classNames";
import { getChainTypeFromChainId } from "~/interfaces/chains";
import Image from "next/image";

export default function NewShillEntryModal({ hide }: { hide: () => void }) {
  const [insertedTweetUrl, setInsertedTweetUrl] = React.useState<string>("");
  const [insertedTokenAddress, setInsertedTokenAddress] = React.useState<string>("");

  async function uploadClickHandler() {
    const tweetId = extractTwitterId(insertedTweetUrl);
    if (!tweetId) {
      toastUtil.error("Invalid tweet URL");
      return;
    }

    const res = await storeNewTweetWithoutChainId({ tweetId, tokenAddress: insertedTokenAddress });
    if (res.isErr()) {
      console.error(`Error storing new tweet: ${res.error}`);
      toastUtil.error(res.error);
      return;
    }
    toastUtil.success("Stored new tweet");
    hide();
  }

  function discardClickHandler() {
    hide();
  }

  const { data: searchedTokenRes = undefined } = useQuery({
    staleTime: 60000,
    gcTime: 60000,
    queryKey: ["searchedTokenRes", insertedTokenAddress],
    queryFn: async (): Promise<{ isFound: boolean; token: Token } | undefined> => {
      if (!isValidAddress(insertedTokenAddress)) {
        return undefined;
      }
      const res = await fetchTokenByAddress({ tokenAddress: insertedTokenAddress });
      if (res.isErr()) {
        console.error(`Error fetching token by address: ${res.error}`);
        return { isFound: false, token: ZERO_TOKEN };
      }
      const token = res.value;
      return { isFound: true, token };
    },
  });

  return (
    <div className="w-[600px] rounded-[11px] bg-[#161619] text-left shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1)]">
      {/* Top section */}
      <div className="flex flex-row items-center justify-between border-b border-solid border-[#27272C] p-4">
        <div className="flex flex-row items-center gap-2">
          <p className="flex text-base font-semibold text-white">New Shill Entry</p>
          <IFrameSvg overrideClassName="size-4" />
        </div>
        <XSvg onClick={hide} overrideClassName="cursor-pointer hover:opacity-70" />
      </div>
      {/* Center section */}
      <div className="flex flex-col gap-8 px-4 py-8">
        <div className="flex flex-col gap-4">
          <p className="font-medium text-white/20">Tweet URL</p>
          <SimpleSearchInput
            value={insertedTweetUrl}
            onChange={(v) => setInsertedTweetUrl(v)}
            placeholder={"https://twitter.com/elonmusk/status/1234567890123456789"}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-medium text-white/20">Coin Contract Address</p>
          <SimpleSearchInput
            value={insertedTokenAddress}
            onChange={(v) => setInsertedTokenAddress(v)}
            placeholder={"0x1234567890123456789012345678901234567890"}
          />
        </div>
        <div
          className={cn("flex flex-row gap-2 justify-start items-center", {
            hidden: !searchedTokenRes,
          })}
        >
          {searchedTokenRes?.isFound ? (
            <>
              <Image
                src={searchedTokenRes.token.logoUrl}
                alt="logo"
                width={30}
                height={30}
                className="rounded-full"
              />
              <p className="text-green">
                found token {searchedTokenRes.token.symbol} (on chain{" "}
                {getChainTypeFromChainId(searchedTokenRes.token.chainId)?.name})
              </p>
            </>
          ) : (
            <p className="text-red">token {formatAddress(insertedTokenAddress)} not found</p>
          )}
        </div>
      </div>
      {/* Bottom section */}
      <div className="flex flex-row justify-end gap-6 rounded-b-[11px] border-t border-solid border-[#27272C] bg-[#1F1F22] p-4">
        <button
          className="px-4 py-2 text-lg text-white hover:text-gray"
          onClick={discardClickHandler}
        >
          Discard
        </button>
        <button
          className={cn(
            "my-2 rounded-[8px] bg-[#E6E6E6] px-4 py-2 text-lg text-black hover:bg-[#E6E6E6]/90",
            { "opacity-50": !insertedTweetUrl || !insertedTokenAddress },
          )}
          onClick={uploadClickHandler}
          disabled={!insertedTweetUrl || !insertedTokenAddress}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
