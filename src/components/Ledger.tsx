"use client";

import { useId, useState } from "react";
import { Chip } from "./ui/Chip";
import { CardHead } from "./ui/Section";
import { launchConfig } from "@/lib/site-config";
import { hoodAsset } from "@/lib/payout";

/**
 * A calculator with empty fields.
 *
 * Every input starts blank, including the fee — a pre-filled "1.5%" and a
 * pre-filled "$2,000,000 of volume" would be a forecast wearing a
 * calculator's clothes, and the reader would remember the output, not the
 * assumption. Type your own numbers and it multiplies them. That is all it
 * does, and the panel says so.
 */
function parse(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value.replace(/,/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function usd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n < 100 ? 2 : 0,
  });
}

function Row({
  id,
  label,
  hint,
  suffix,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  hint: string;
  suffix?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="label block">
        {label}
      </label>
      <div className="mt-2 flex items-center gap-2">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          className="field"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        {suffix && (
          <span className="text-[12px] text-ink-faint">{suffix}</span>
        )}
      </div>
      <p className="prose-sans mt-1.5 text-[11px] leading-relaxed text-ink-faint">
        {hint}
      </p>
    </div>
  );
}

export function Ledger() {
  const uid = useId();
  const [volume, setVolume] = useState("");
  const [share, setShare] = useState("");
  const [fee, setFee] = useState("");

  const volumeValue = parse(volume);
  const shareValue = parse(share);
  const feeValue = parse(fee);

  const complete =
    volumeValue !== null && shareValue !== null && feeValue !== null;

  const daily = complete
    ? volumeValue * (feeValue / 100) * (shareValue / 100)
    : null;

  return (
    <div className="card overflow-hidden">
      <CardHead
        title="Work it out yourself"
        aside={
          <Chip tone="muted">
            {launchConfig.feeDescription
              ? "fee set"
              : "fee undecided — you supply it"}
          </Chip>
        }
      />

      <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:p-6">
        <div className="grid gap-5 sm:grid-cols-3">
          <Row
            id={`${uid}-volume`}
            label="Daily volume"
            hint="Traded value in 24h, in dollars. Nobody knows this number yet."
            value={volume}
            onChange={setVolume}
            placeholder="0"
            suffix="$"
          />
          <Row
            id={`${uid}-fee`}
            label="Fee to holders"
            hint="Share of each trade routed to the payout. Not decided — see § 07."
            value={fee}
            onChange={setFee}
            placeholder="0"
            suffix="%"
          />
          <Row
            id={`${uid}-share`}
            label="Your share of supply"
            hint="Your holding as a percentage of total supply."
            value={share}
            onChange={setShare}
            placeholder="0"
            suffix="%"
          />
        </div>

        <div className="border-t border-rule pt-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
          <p className="label">{hoodAsset.symbol} bought for you</p>
          <p className="num mt-3 text-[32px] leading-none">
            {daily === null ? (
              <span className="text-ink-faint">—</span>
            ) : (
              usd(daily)
            )}
            <span className="ml-2 text-[12px] text-ink-faint">/ day</span>
          </p>
          <p className="num mt-3 text-[15px] text-ink-dim">
            {daily === null ? "—" : usd(daily * 30)}
            <span className="ml-2 text-[11px] text-ink-faint">/ 30 days</span>
          </p>

          <p className="prose-sans mt-5 text-[11.5px] leading-relaxed text-ink-faint">
            {complete
              ? "This is your three numbers multiplied together. It is not a projection, and it assumes a fee size, a volume and a supply share that do not exist yet."
              : "Fill all three fields. Nothing is pre-filled, because a pre-filled assumption is the part a reader remembers."}
          </p>
        </div>
      </div>
    </div>
  );
}
