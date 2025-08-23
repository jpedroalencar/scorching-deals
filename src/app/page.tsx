import { createClient } from "@/app/lib/supabase/server";

export default async function Home() {

  const supabase = await createClient();
  await supabase.auth.getSession()

  return (
    <main className="min-h-[100dvh] flex items-center justify-center p-4">
      <section className="w-full max-w-screen-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl px-5 py-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-glow text-white font-bold leading-tight">
          🔥 Scorching Deals
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-100/90">In Construction</p>
        <p className="mt-6 text-xs sm:text-sm text-gray-200/90 font-mono whitespace-pre-wrap break-all select-all">
          NGM2QzdiOTcyNjllNjg2MTIwNmM2OTZlNjQ2OTZlNjg2MTIwNTMy
        </p>
      </section>
    </main>
  );
}









/*
<main className="flex min-h-screen items-center justify-center bg-animated-scorching">
  <div className="text-center">
    <h1 className="text-5xl font-bold text-white mb-4">
      🔥 Scorching Deals 🔥
    </h1>
    <br />
    <h2 className="text-4xl font-bold text-white mb-4">In Construction</h2>
    <p className="text-gray-200">
      NGM2QzdiOTcyNjllNjg2MTIwNmM2OTZlNjQ2OTZlNjg2MTIwNTMy
    </p>
  </div>
</main>*/
