import Image from "next/image";
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

const features = [
  {
    title: "App & Pages Router",
    description:
      "支持文件系统路由，既可以继续使用 Pages Router，也可以使用新一代的 App Router。",
  },
  {
    title: "SSR 与 SSG",
    description:
      "内置服务端渲染与静态站点生成，按需选择，兼顾 SEO 与性能。",
  },
  {
    title: "API Routes",
    description:
      "在同一个项目中直接编写后端接口，无需额外搭建服务器。",
  },
  {
    title: "内置优化",
    description:
      "自动代码分割、图片优化、字体优化与增量静态再生成，开箱即用。",
  },
];

export default function About() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← Back to home
        </Link>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div className="flex items-center gap-3">
            <Image
              className="dark:invert h-8 w-8"
              src="/next.svg"
              alt="Next.js logo"
              width={32}
              height={32}
              priority
            />
            <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
              About Next.js
            </h1>
          </div>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Next.js 是基于 React 的全栈 Web 框架，由 Vercel 开发维护。它提供
            文件路由、服务端渲染、静态生成等能力，让开发者可以轻松构建快速、
            可扩展的现代化 Web 应用。
          </p>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-2 rounded-2xl border border-black/[.08] p-5 dark:border-white/[.145]"
            >
              <h2 className="text-base font-semibold text-black dark:text-zinc-50">
                {feature.title}
              </h2>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 w-full rounded-full px-5 md:w-[158px]"
          >
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 w-full rounded-full px-5 md:w-[158px]"
          >
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learning
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
}
