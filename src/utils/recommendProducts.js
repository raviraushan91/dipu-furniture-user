const STOP_WORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "from",
  "this",
  "that",
  "your",
  "you",
  "are",
  "was",
  "were",
  "have",
  "has",
  "had",
  "our",
  "into",
  "about",
  "in",
  "on",
  "of",
  "to",
  "a",
  "an",
]);

const tokenize = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token && !STOP_WORDS.has(token));

const tokenSimilarity = (aTokens, bTokens) => {
  const aSet = new Set(aTokens);
  const bSet = new Set(bTokens);
  if (!aSet.size || !bSet.size) return 0;

  let intersection = 0;
  for (const token of aSet) {
    if (bSet.has(token)) intersection += 1;
  }

  const union = new Set([...aSet, ...bSet]).size;
  return union ? intersection / union : 0;
};

export const recommendProducts = (selectedProduct, allProducts, limit = 4) => {
  if (!selectedProduct || !Array.isArray(allProducts)) return [];

  const selectedTokens = tokenize(
    `${selectedProduct.name} ${selectedProduct.category} ${selectedProduct.description}`
  );
  const selectedPrice = Number(selectedProduct.price) || 0;

  return allProducts
    .filter((item) => String(item.id) !== String(selectedProduct.id))
    .map((item) => {
      const itemTokens = tokenize(`${item.name} ${item.category} ${item.description}`);
      const textScore = tokenSimilarity(selectedTokens, itemTokens); // 0-1
      const categoryScore =
        String(item.category).toLowerCase() ===
        String(selectedProduct.category).toLowerCase()
          ? 0.35
          : 0;

      const itemPrice = Number(item.price) || 0;
      const priceDiff = Math.abs(itemPrice - selectedPrice);
      const denom = Math.max(selectedPrice, 1);
      const priceScore = Math.max(0, 1 - priceDiff / denom) * 0.2;

      const ratingScore = (Number(item.rating) || 0) / 5 * 0.1;
      const finalScore = textScore * 0.6 + categoryScore + priceScore + ratingScore;

      return { item, score: finalScore };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
};
