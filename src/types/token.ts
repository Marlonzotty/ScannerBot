export interface Link {
  type?: string;
  label?: string;
  url?: string;
}

export interface Signal {
  tokenAddress?: string;
  url?: string;
  icon?: string;
  header?: string;
  description?: string;
  chainId?: string;
  links?: Link[];

  // 🧠 Campos adicionados pelo GPT
  decision?: "entrada" | "observar" | "evitar";
  confidence?: number;
  rationale?: string;

  // 🧪 Campos dos filtros locais (status da avaliação local)
  status?: string;
  failed?: string[];
}
