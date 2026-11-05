/* eslint-disable @next/next/no-img-element */
export default function Avatar({
  name,
  image,
  size = 36,
}: {
  name: string;
  image?: string | null;
  size?: number;
}) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="flex items-center justify-center rounded-full bg-green-700 font-semibold text-white"
      style={{ width: size, height: size }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}