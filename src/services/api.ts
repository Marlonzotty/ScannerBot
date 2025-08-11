// src/services/api.ts

// Base URL da API - pega do .env ou usa padrão no dev
const RAW_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? "http://127.0.0.1:8000" : "");
const BASE = RAW_BASE.replace(/\/+$/, ""); // remove barra no final

export async function getSignals(analyze = false) {
  const path = "/signals";
  const query = analyze ? "?analyze=true" : "";
  const url = BASE ? `${BASE}${path}${query}` : `${path}${query}`;

  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });

    if (!res.ok) {
      throw new Error(`Erro ao buscar tokens. (HTTP ${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error("[getSignals] Falha ao buscar sinais:", error);
    return []; // devolve lista vazia para evitar quebra na UI
  }
}
