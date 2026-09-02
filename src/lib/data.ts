/**
 * EVERY number in this file is zero, and that is the product requirement,
 * not an oversight.
 *
 * The site must never present a fabricated figure as a chain statistic.
 * Until the token, the router and an indexer exist, stats stay at 0 and the
 * UI renders an unissued blank instead of a value. When real reads exist,
 * wire them here and flip `LIVE_DATA_ENABLED` — do not seed this file with
 * plausible-looking numbers to make screenshots nicer.
 */
export const LIVE_DATA_ENABLED = false;

export interface RegisterStats {
  /** USD of HOOD bought and sent to holders, all time. */
  distributedUsd: number;
  /** Whole-share equivalent of that, for the "you own a slice" line. */
  sharesDistributed: number;
  /** Fees collected but not yet swapped and sent. */
  pendingEpochUsd: number;
  feesCollectedUsd: number;
  volumeUsd: number;
  holders: number;
  /** Distributions executed since launch. */
  epochs: number;
}

export const registerStats: RegisterStats = {
  distributedUsd: 0,
  sharesDistributed: 0,
  pendingEpochUsd: 0,
  feesCollectedUsd: 0,
  volumeUsd: 0,
  holders: 0,
  epochs: 0,
};
