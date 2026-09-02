"use client";

import { useBlock, useGasPrice } from "wagmi";
import { formatGwei } from "viem";
import { clsx } from "clsx";
import { Chip } from "./ui/Chip";
import { CardHead } from "./ui/Section";
import { useNowSeconds } from "@/lib/clock";
import { ROBINHOOD_CHAIN_ID } from "@/lib/chain";

/**
 * The one panel on this site whose numbers are true right now: they are read
 * from the Robinhood Chain RPC in the visitor's own browser. It sits
 * directly above the project's own figures, which are all zero, and the
 * contrast is the point — the chain is real, the project is not live, and
 * the page should not borrow the credibility of the first for the second.
 */
function Cell({
  label,
  value,
  tone = "ink",
}: {
  label: string;
  value: string;
  tone?: "ink" | "green" | "stamp";
}) {
  return (
    <div className="bg-paper-2 p-4">
      <p className="label">{label}</p>
      <p
        className={clsx(
          "num mt-2 text-[18px] leading-none",
          tone === "green" && "text-green",
          tone === "stamp" && "text-stamp",
          tone === "ink" && "text-ink",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function ChainReadout() {
  const now = useNowSeconds();

  const block = useBlock({ query: { refetchInterval: 6_000 } });
  const gas = useGasPrice({ query: { refetchInterval: 30_000 } });

  const failed = block.isError;
  const waiting = block.isPending;

  const height = block.data ? block.data.number.toLocaleString("en-US") : "—";

  // Age of OUR READ, not of the block. Robinhood Chain produces blocks far
  // faster than the 6s poll below, so a block's own timestamp is always ~0s
  // old and labelling this "last block" would be quietly false: what is a
  // few seconds stale here is the panel, not the chain.
  // `now` is 0 until the clock's first tick, which is also the server render.
  const readAgeSeconds =
    block.dataUpdatedAt > 0 && now > 0
      ? Math.max(0, now - Math.floor(block.dataUpdatedAt / 1000))
      : null;

  const gasPrice = gas.data ? Number(formatGwei(gas.data)) : null;
  const gasLabel =
    gasPrice === null
      ? "—"
      : `${gasPrice >= 1 ? gasPrice.toFixed(2) : gasPrice.toPrecision(3)} gwei`;

  return (
    <div className="card overflow-hidden">
      <CardHead
        title={`Robinhood Chain · ${ROBINHOOD_CHAIN_ID}`}
        aside={
          failed ? (
            <Chip tone="unissued" dot>
              RPC unreachable
            </Chip>
          ) : waiting ? (
            <Chip tone="muted" dot>
              Connecting
            </Chip>
          ) : (
            <Chip tone="live" dot>
              Live · read in your browser
            </Chip>
          )
        }
      />
      <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
        <Cell
          label="Block height"
          value={height}
          tone={block.data ? "green" : "stamp"}
        />
        <Cell
          label="Last read"
          value={readAgeSeconds === null ? "—" : `${readAgeSeconds}s ago`}
          tone={readAgeSeconds === null ? "stamp" : "ink"}
        />
        <Cell
          label="Gas price"
          value={gasLabel}
          tone={gasPrice === null ? "stamp" : "ink"}
        />
        <Cell
          label="RPC"
          value={failed ? "unreachable" : waiting ? "connecting" : "responding"}
          tone={failed ? "stamp" : waiting ? "stamp" : "green"}
        />
      </div>
    </div>
  );
}
