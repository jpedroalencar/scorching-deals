import { createClient } from "@/lib/supabase/server";
import DealCard from "@/components/DealCard";

export const dynamic = 'force-dynamic'; //will switch to const revalidate = 60

type DealRow = {
  id: number;
  title: string;
  url: string;
  price: number | null;
  created_at: string;
  //nested relations
  stores?: { id: number; name: string | null; slug: string | null; domain: string | null }[] | null;
  categories?: { id: number; name: string | null; slug: string | null }[] | null;
  status?: { status_name: string }[] | null;
}

function hostFromUrl(u?: string | null) {
  if (!u) return null;
  try {
    const withProto = /^https?:\/\//i.test(u) ? u : `https://${u}`;
    return new URL(withProto).hostname.replace(/^www\./, '');
  } catch {
    return null
  }
}

// server-side data fetch
async function getLatestDeals(): Promise<DealRow[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('deals')
    .select(`id, title, url, price, created_at, stores: store_id (id, name, slug, domain),categories:category_id (id, name, slug), status: status_id (status_name)`)
    .eq('status_id', 1)
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })
    .limit(20)


  if (error) {
    console.error('Supabase error in getLastestDeals:', error)
    return [];
  }

  return data ?? [];
}

export default async function Home() {
  const rows = await getLatestDeals();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold mb-2">Latest deals</h1>
        <p className="opacity-70 text-sm">Fresh 20.</p>
      </header>

      {rows.length === 0 ? (
        <div className="rounded-xl border p-6 text-sm opacity-80">
          No deals yet. Add some via your seed script or in the Supabase table editor.
        </div>
      ) : (
        <ul className="space-y-3">
          {rows.map((r) => (
            <DealCard
              key={r.id}
              d={{
                id: r.id,
                title: r.title ?? r.url ?? `Deal #${r.id}`,
                price: r.price ?? null,
                merchant: r.stores?.[0]?.name ?? hostFromUrl(r.url),
                category: r.categories?.[0]?.name ?? null,
                image_url: null, // not in schema yet
              }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
