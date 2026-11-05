import Link from "next/link";

export default function NotFoundBlock({
  title = "৪০৪ — পেজটি খুঁজে পাওয়া যায়নি",
  text = "আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে।",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-6xl">🧺</p>
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-600">{text}</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}