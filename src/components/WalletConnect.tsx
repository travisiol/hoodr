"use client";

import { useConnect, useConnection, useDisconnect, useSwitchChain } from "wagmi";
import { clsx } from "clsx";
import { robinhoodChain } from "@/lib/chain";

function short(address: string) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

/**
 * Injected connector only — no WalletConnect project id, no wallet library.
 * wagmi's `ssr: true` keeps the server render and the first client render
 * both "disconnected", so no hydration gate is needed here.
 *
 * Connecting proves nothing about the project and unlocks nothing: there is
 * no contract to read yet. It is here so the network path is real and
 * testable before launch rather than written on launch day.
 */
export function WalletConnect({ className }: { className?: string }) {
  const { address, isConnected, chainId } = useConnection();
  const {
    connect,
    connectors,
    isPending: isConnecting,
    error: connectError,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const { mutate: switchChain, isPending: isSwitching } = useSwitchChain();

  const wrongNetwork = isConnected && chainId !== robinhoodChain.id;

  if (isConnected && address) {
    if (wrongNetwork) {
      return (
        <button
          type="button"
          onClick={() => switchChain({ chainId: robinhoodChain.id })}
          disabled={isSwitching}
          className={clsx(
            "rounded-[2px] border border-stamp/45 bg-stamp-soft px-3 py-2 text-[10px] font-medium tracking-[0.16em] text-stamp uppercase transition hover:bg-stamp/15 disabled:opacity-60",
            className,
          )}
        >
          {isSwitching ? "Switching…" : "Wrong network — switch"}
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={() => disconnect()}
        title="Disconnect wallet"
        className={clsx(
          "flex items-center gap-2 rounded-[2px] border border-rule-2 px-3 py-2 text-[10px] font-medium tracking-[0.16em] text-ink uppercase transition hover:border-green hover:text-green",
          className,
        )}
      >
        <span aria-hidden className="h-1 w-1 rounded-full bg-green" />
        {/* normal-case: an address must keep its EIP-55 casing */}
        <span className="num normal-case">{short(address)}</span>
      </button>
    );
  }

  const injectedConnector = connectors[0];

  return (
    <div className={clsx("flex flex-col items-end gap-1", className)}>
      <button
        type="button"
        disabled={!injectedConnector || isConnecting}
        onClick={() =>
          injectedConnector && connect({ connector: injectedConnector })
        }
        className="rounded-[2px] border border-green/40 bg-green-soft px-3 py-2 text-[10px] font-medium tracking-[0.16em] text-green uppercase transition hover:bg-green/15 disabled:cursor-not-allowed disabled:border-rule disabled:bg-transparent disabled:text-ink-faint"
      >
        {isConnecting
          ? "Connecting…"
          : injectedConnector
            ? "Connect wallet"
            : "No wallet found"}
      </button>
      {connectError && (
        <span className="max-w-[220px] text-right text-[10px] leading-tight text-stamp">
          {connectError.message}
        </span>
      )}
    </div>
  );
}
