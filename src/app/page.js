import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Welcome to Next.js
        </h1>
        
        <p className="text-lg text-slate-400">
          Your project is set up with JavaScript, Tailwind CSS, ESLint, and AGENTS.md.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-slate-900 font-semibold rounded-lg shadow-md transition duration-200">
            Get Started
          </button>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold rounded-lg transition duration-200"
          >
            Read Docs
          </a>
        </div>
      </div>
    </main>
  );
}