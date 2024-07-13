import {
  ApiTokenResponse,
  ApiTweetResponse,
  ApiUserAndItsGeneralStatsResponse,
  ApiUserResponse,
  Token,
  Tweet,
  User,
  UserAndItsGeneralStats,
  ApiProfileTweetRowResponse,
  ProfileTweetRow,
} from "~/interfaces/responses";
import dayjs from "dayjs";

export function transformUser(u: ApiUserResponse): User {
  return {
    id: u.id,
    userId: u.user_id,
    userName: u.user_name,
    profileImg: u.profile_img,
    twitterHandle: u.handle,
  };
}

export function transformTweet(t: ApiTweetResponse): Tweet {
  return {
    tweetId: t.tweet_id,
    text: t.text,
    isDeleted: t.is_deleted,
    userId: t.user_id,
    assetId: t.asset_id,
    originAssetPrice: parseFloat(t.origin_asset_price),
    createdAt: dayjs(t.created_at),
    capturedAt: dayjs(t.captured_at),
    updatedAt: dayjs(t.updated_at),
  };
}

export function transformToken(t: ApiTokenResponse): Token {
  return {
    name: t.name,
    symbol: t.symbol,
    address: t.address,
    chainId: t.chain_id,
    decimals: t.decimals,
    logoUrl: t.logo_url,
  };
}

export function transformGeneralStatistics(
  s: ApiUserAndItsGeneralStatsResponse,
): UserAndItsGeneralStats {
  return {
    user: transformUser(s.user),
    statistics: {
      lastTen: s.statistics.last_ten || [],
      totalWins: s.statistics.total_wins,
      tweetCount: s.statistics.tweet_count,
      totalLosses: s.statistics.total_losses,
      winratePercentage:
        s.statistics.tweet_count > 0
          ? `${(s.statistics.total_wins / s.statistics.tweet_count).toFixed(2)}%`
          : "-%",
    },
  };
}

export function transformProfileTweetRow(t: ApiProfileTweetRowResponse): ProfileTweetRow {
  return {
    tweetId: t.tweet_id,
    text: t.text,
    createdAt: dayjs(t.created_at),
    ticker: t.ticker,
    originPrice: t.origin_price,
    markPrice: t.mark_price,
    returnPercentage: t.return_percentage,
  };
}
