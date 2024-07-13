import React from "react";
import { cn } from "~/utils/classNames";
import Checkbox from "~/components/checkbox";
import HeaderSearchInput from "~/components/headerSearchInput";
import useModal from "~/hooks/useModal";
import NewShillEntryModal from "~/components/newShillEntryModal";
import Table, { CellItem, TableWithoutPagination } from "~/components/table";
import { useQuery } from "@tanstack/react-query";
import { fetchAutocompletedUsers, fetchAutocompletedUsersWithStats } from "~/requests/users";
import { User, UserAndItsGeneralStats } from "~/interfaces/responses";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toastUtil } from "~/components/toast";

export default function Header() {
  const [searchInputValue, setSearchInputValue] = React.useState<string>("");
  const { show, hide } = useModal();

  function clickNewEntryButtonHandler() {
    show(<NewShillEntryModal hide={hide} />, {
      padding: 16,
      width: "407px",
      showClose: false,
      unstyled: true,
    });
  }

  function clickAboutButtonHandler() {
    console.log("About button clicked");
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-2 mx-auto mt-[8px] w-11/12 z-50",
        "rounded-[12px] border border-solid border-black/12 bg-black px-[8px]",
      )}
    >
      <div className={cn("flex flex-row items-center justify-between")}>
        <div className="flex flex-row gap-2" />
        <div>
          <HeaderSearchInput
            value={searchInputValue}
            onChange={setSearchInputValue}
            placeholder="Search by Twitter/X"
          />
        </div>
        <div className="flex flex-row gap-8">
          <button
            className="px-4 py-2 text-lg text-white hover:text-gray"
            onClick={clickAboutButtonHandler}
          >
            About
          </button>
          <button
            className="my-2 rounded-[8px] bg-[#E6E6E6] px-4 py-2 text-lg text-black hover:bg-[#E6E6E6]/90"
            onClick={clickNewEntryButtonHandler}
          >
            New Entry
          </button>
        </div>
      </div>
      <HeaderSearchResultsContainer
        searchInputValue={searchInputValue}
        onUserSelected={() => setSearchInputValue("")}
      />
    </div>
  );
}

function HeaderSearchResultsContainer({
  searchInputValue,
  onUserSelected,
}: {
  searchInputValue: string;
  onUserSelected?: (user: User) => void;
}) {
  const router = useRouter();

  const { data: autocompleteResults = { usersWithStats: [], totalCount: 0 } } = useQuery({
    staleTime: 60000,
    gcTime: 60000,
    queryKey: ["autocompletedUsers", searchInputValue],
    queryFn: async (): Promise<{
      usersWithStats: UserAndItsGeneralStats[];
      totalCount: number;
    }> => {
      if (searchInputValue.length < 2) {
        return { usersWithStats: [], totalCount: 0 };
      }
      const autocompletedUsersRes = await fetchAutocompletedUsersWithStats({
        name: searchInputValue,
        page: 1,
        size: 20,
      });
      if (autocompletedUsersRes.isErr()) {
        return { usersWithStats: [], totalCount: 0 };
      }

      const usersWithStats = autocompletedUsersRes.value.results;
      const totalCount = autocompletedUsersRes.value.totalCount;
      return { usersWithStats, totalCount };
    },
  });

  const rowItems: CellItem[][] = autocompleteResults.usersWithStats.map((u) => {
    const user = u.user;
    const stats = u.statistics;
    return [
      <div className="flex flex-row items-center gap-2" key={user.id}>
        <Image src={user.profileImg} alt="avatar" width={20} height={20} className="rounded-full" />
        <p>{user.userName}</p>
      </div>,
      `@${user.twitterHandle}`,
      stats.totalWins,
      stats.tweetCount,
      "-",
    ];
  });

  function rowClickHandler(idx: number) {
    if (idx < 0 || autocompleteResults.usersWithStats.length <= idx) {
      return;
    }
    const user = autocompleteResults.usersWithStats[idx].user;
    if (!user) {
      toastUtil.error(`Error to navigate to user.`);
      return;
    }
    router.push(`/profile/${user.twitterHandle}`);
    onUserSelected?.(user);
  }

  if (!searchInputValue) {
    return <></>;
  }

  return (
    <TableWithoutPagination
      columnAllocationSizeClassName="grid-cols-[10fr_8fr_4fr_4fr_6fr]"
      headers={[
        { label: "Name" },
        { label: "Twitter" },
        { label: "Winrate" },
        { label: "Calls" },
        { label: "Avg. Return" },
      ]}
      cellItems={rowItems}
      isOnDarkMode={true}
      onRowClick={rowClickHandler}
      rowClassName={cn("hover:bg-[#515154] cursor-pointer")}
    />
  );
}
