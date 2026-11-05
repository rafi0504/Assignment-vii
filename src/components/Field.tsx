export default function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/20"
      />
    </label>
  );
}