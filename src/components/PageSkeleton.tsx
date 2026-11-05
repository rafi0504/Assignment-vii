export default function PageSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-4 px-4 py-10">
      <div className="h-32 animate-pulse rounded-2xl bg-gray-200" />
      <div className="h-24 animate-pulse rounded-2xl bg-gray-200" />
      <div className="h-64 animate-pulse rounded-2xl bg-gray-200" />
    </div>
  );
}