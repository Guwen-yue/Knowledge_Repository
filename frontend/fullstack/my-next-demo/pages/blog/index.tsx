import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const posts = [
  {
    title: "Getting Started with Next.js",
    date: "2026-08-15",
    summary:
      "了解如何从零开始搭建一个 Next.js 项目，包括项目结构、Pages Router 与 App Router 的选择，以及开发服务器的使用。",
  },
  {
    title: "Understanding Server Side Rendering",
    date: "2026-08-20",
    summary:
      "深入理解 Next.js 的服务端渲染（SSR）与静态生成（SSG），以及如何根据业务场景选择合适的渲染方式。",
  },
];

export default function Blog() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Blog
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Next.js 学习笔记与经验分享。
          </p>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.title}
              className="flex flex-col gap-3 rounded-2xl border border-black/[.08] p-5 transition-colors hover:bg-black/[.02] dark:border-white/[.145] dark:hover:bg-white/[.03]"
            >
              <time className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {post.date}
              </time>
              <h2 className="text-base font-semibold leading-6 text-black dark:text-zinc-50">
                {post.title}
              </h2>
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {post.summary}
              </p>
            </article>
          ))}
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Total posts: {posts.length}
        </p>
      </main>
    </div>
  );
}
