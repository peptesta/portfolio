import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-semibold">404</h1>
      <Link href="/" className="text-accent">
        Back home
      </Link>
    </main>
  );
}
