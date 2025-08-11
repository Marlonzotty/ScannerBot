import React from "react";
import type { Signal } from "../types/token";
import { Window, WindowContent, Button } from "react95";

interface Props { token: Signal }

const labelFromChain = (chainId?: string | number) => {
  if (!chainId) return "Unknown";
  const n = String(chainId).toLowerCase();
  if (["sol", "solana", "101"].includes(n)) return "Solana";
  if (["eth", "ethereum", "1"].includes(n)) return "Ethereum";
  if (["bsc", "bscmainnet", "56"].includes(n)) return "BSC";
  return String(chainId);
};

const truncateAddress = (addr?: string, left = 6, right = 4) =>
  !addr ? "unknown" : (addr.length <= left + right ? addr : `${addr.slice(0, left)}…${addr.slice(-right)}`);

const TokenCard: React.FC<Props> = ({ token }) => {
  const name =
    (token as any)?.symbol ||
    (token as any)?.name ||
    truncateAddress(token.tokenAddress);

  const canCopy = Boolean(token.tokenAddress);
  const canOpen = Boolean(token.url);

  const onCopy = async () => {
    if (!token.tokenAddress) return;
    await navigator.clipboard.writeText(token.tokenAddress);
  };
  const onOpen = () => {
    if (!token.url) return;
    window.open(token.url, "_blank", "noopener,noreferrer");
  };

  const links = (token.links ?? []).filter((l) => Boolean(l?.url));

  const decision = token.decision?.toLowerCase();
  const decisionLabel = decision?.toUpperCase() || "—";
  const decisionClass =
    decision === "entrada"
      ? "border-green-700 text-green-300"
      : decision === "evitar"
      ? "border-red-700 text-red-300"
      : "border-yellow-700 text-yellow-300";

  return (
    <Window className="h-full flex flex-col border border-green-600 bg-[#0e0e0e] rounded-md shadow-lg hover:border-green-400 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 bg-[#0a0a0a] text-green-400 px-3 py-2 rounded-t-md">
        <div className="flex items-center gap-2 min-w-0">
          {token.icon ? (
            <img src={token.icon} alt="icon" className="w-5 h-5 border border-green-700" />
          ) : (
            <div className="w-5 h-5 border border-green-700 flex items-center justify-center text-[10px]">?</div>
          )}
          <span className="truncate font-semibold">{name}</span>
          <span className="ml-2 text-[10px] px-2 py-0.5 border border-green-700 bg-black text-green-300/90 shrink-0">
            {labelFromChain(token.chainId as any)}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button onClick={onCopy} disabled={!canCopy} className="px-2 py-1">Copy</Button>
          <Button onClick={onOpen} disabled={!canOpen} className="px-2 py-1">Open</Button>
        </div>
      </div>

      <WindowContent className="flex-1 bg-[#0e0e0e] text-green-300 p-3">
        <div className="text-xs space-y-1 mb-3">
          <div className="break-all">{token.tokenAddress ?? "—"}</div>
        </div>

        {token.description && (
          <div className="relative max-h-24 overflow-hidden mb-3">
            <p className="text-xs leading-relaxed">{token.description}</p>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
          </div>
        )}

        {/* Resultado da análise GPT */}
        {(token.decision || token.confidence != null || token.rationale) && (
          <div className="mb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 border bg-black ${decisionClass}`}>
                {decisionLabel}
              </span>
              {typeof token.confidence === "number" && (
                <span className="opacity-80">{token.confidence}%</span>
              )}
            </div>
            {token.rationale && (
              <div className="mt-1 opacity-80">{token.rationale}</div>
            )}
          </div>
        )}

        {/* Diagnóstico dos filtros locais */}
        {(token.status || (token.failed && token.failed.length > 0)) && (
          <div className="mb-3 text-[11px] opacity-80">
            {token.status && (
              <div className="mb-1">
                <span className="px-2 py-0.5 border border-green-700 bg-black">
                  status: {token.status}
                </span>
              </div>
            )}
            {token.failed && token.failed.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {token.failed.map((f, i) => (
                  <span key={`${f}-${i}`} className="px-2 py-0.5 border border-red-700 bg-black text-red-300">
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {links.length > 0 && (
          <div className="mt-auto">
            <div className="text-[10px] mb-1 opacity-80">Links oficiais</div>
            <ul className="space-y-1">
              {links.map((link, i) => (
                <li key={`${link.url}-${i}`}>
                  <a
                    href={link.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline decoration-green-700 hover:text-green-400 break-all"
                  >
                    {link.type || "Link"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </WindowContent>
    </Window>
  );
};

export default TokenCard;
