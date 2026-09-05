import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function NotFound() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-6 bg-white px-16 py-32 text-center dark:bg-black">
        <p className="text-7xl font-bold tracking-tight text-black dark:text-zinc-50">
          404
        </p>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Page not found
          </h1>
          <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Sorry, the page you are looking for does not exist or has been
            moved. Please check the address or go back to the home page.
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="h-12 rounded-full px-8"
        >
          <Link href="/">Back to home</Link>
        </Button>
      </main>
    </div>
  );
}
