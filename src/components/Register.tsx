import { Chip } from "./ui/Chip";
import { CardHead, Blank } from "./ui/Section";
import { LIVE_DATA_ENABLED, registerStats } from "@/lib/data";
import { hoodAsset } from "@/lib/payout";

/**
 * The project's own numbers. Every one of them is zero and none of them is
 * rendered as a zero: until an indexer exists there is no measurement, and
 * "0" would be a claim about the world that nobody has checked. Blanks
 * instead — see src/lib/data.ts.
 */
const rows = [
  {
    label: `${hoodAsset.symbol} bought for holders`,
    value: registerStats.distributedUsd,
    format: (v: number) => `$${v.toLocaleString("en-US")}`,
  },
  {
    label: "Whole shares equivalent",
    value: registerStats.sharesDistributed,
    format: (v: number) => v.toFixed(4),
  },
  {
    label: "Fees awaiting the next run",
    value: registerStats.pendingEpochUsd,
    format: (v: number) => `$${v.toLocaleString("en-US")}`,
  },
  {
    label: "Fees collected, all time",
    value: registerStats.feesCollectedUsd,
    format: (v: number) => `$${v.toLocaleString("en-US")}`,
  },
  {
    label: "Volume, all time",
    value: registerStats.volumeUsd,
    format: (v: number) => `$${v.toLocaleString("en-US")}`,
  },
  {
    label: "Holders",
    value: registerStats.holders,
    format: (v: number) => v.toLocaleString("en-US"),
  },
  {
    label: "Distributions executed",
    value: registerStats.epochs,
    format: (v: number) => v.toLocaleString("en-US"),
  },
];

export function Register() {
  return (
    <div className="card overflow-hidden">
      <CardHead
        title="The register"
        aside={
          LIVE_DATA_ENABLED ? (
            <Chip tone="live" dot>
              Indexed
            </Chip>
          ) : (
            <Chip tone="unissued" dot>
              Nothing has happened yet
            </Chip>
          )
        }
      />
      <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((row) => (
          <div key={row.label} className="bg-paper-2 p-4">
            <p className="label">{row.label}</p>
            <p className="mt-2 text-[18px] leading-none">
              <Blank
                value={LIVE_DATA_ENABLED ? row.format(row.value) : null}
                width="4.5rem"
              />
            </p>
          </div>
        ))}
        <div className="bg-paper-2 p-4">
          <p className="label">Reading</p>
          <p className="prose-sans mt-2 text-[12px] leading-relaxed text-ink-faint">
            Wired to an indexer at launch. Blank until then.
          </p>
        </div>
      </div>
    </div>
  );
}
