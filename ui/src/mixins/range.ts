export type RangeType = {
  start: number;
  end: number;
  limit?: number;
  length?: number;
};
export function range({
  start,
  end,
  limit,
  length = end - start + 1,
}: RangeType): number[] {
  return Array.from({ length: limit || length }, (_, i) => start + i);
}
