import React, { useEffect, useMemo, useState } from "react";
import { getSignals } from "../services/api";
import type { Signal } from "../types/token";
import TokenCard from "../components/TokenCard";
import { Window, WindowContent, Button } from "react95";

const Home: React.FC = () => {
  const [tokens, setTokens] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (withAnalysis = false) => {
    setRefreshing(true);
    try {
      const data = await getSignals(withAnalysis); // 👈 agora aceita análise opcional
      setTokens(data || []);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData(false); // carga inicial sem GPT
  }, []);

  const filtered = useMemo(() => {
    if (!q.trim()) return tokens;
    const s = q.toLowerCase();
    return tokens.filter((t) =>
      [t.tokenAddress, (t as any)?.symbol, (t as any)?.name, t.description]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(s))
    );
  }, [tokens, q]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <Window className="w-full shadow-2xl border border-green-700 bg-[#0e0e0e] rounded-md">
          {/* Header custom da página */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0a0a0a] text-green-400 px-4 py-3 rounded-t-md">
            <h1
              className="glitch text-2xl md:text-3xl font-bold mb-6 border-b border-green-700 pb-2"
              data-text="ZOTTY SCANNER // MEME COINS 🧠"
            >
              ZOTTY SCANNER // MEME COINS 🧠
            </h1>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Filtrar..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="bg-[#0a0a0a] text-green-400 border border-green-700 px-2 py-1 text-xs outline-none"
              />
              <Button onClick={() => fetchData(false)} disabled={refreshing}>
                {refreshing ? "Atualizando..." : "Refresh"}
              </Button>
              <Button onClick={() => fetchData(true)} disabled={refreshing}>
                {refreshing ? "Analisando..." : "🔍 Analisar com GPT"}
              </Button>
            </div>
          </div>

          <WindowContent className="bg-[#0e0e0e] p-4">
            {/* Skeleton */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 [grid-auto-rows:1fr]">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="border border-green-700 rounded bg-black p-4 animate-pulse h-full"
                  />
                ))}
              </div>
            )}

            {/* Vazio */}
            {!loading && filtered.length === 0 && (
              <p className="text-red-400 text-sm mt-3">🚫 Nenhum sinal encontrado</p>
            )}

            {/* Lista */}
            {!loading && filtered.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 [grid-auto-rows:1fr]">
                {filtered.map((token, i) => (
                  <div key={i} className="h-full">
                    <TokenCard token={token} />
                  </div>
                ))}
              </div>
            )}
          </WindowContent>
        </Window>
      </div>
    </div>
  );
};

export default Home;
