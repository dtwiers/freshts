export type ContextLayer = {
  data: unknown;
  tags: string[];
};

export type ResolverData = {
  layeredContexts: ContextLayer[];
  globalData: Record<string, unknown>;
};
