import { toBn } from "@/lib/utils";

export default function Badge({ dir, pct }: { dir: string; pct: number }) {
  const up = dir === "up";
  const down = dir === "down";
  const color = up ? "text-red-600" : down ? "text-green-700" : "text-gray-500";
  const icon = up ? "▲" : down ? "▼" : "—";
  return (
    <span className={`text-sm font-semibold whitespace-nowrap ${color}`}>
      {icon} {toBn(Number(pct).toFixed(1))}%
    </span>
  );
}