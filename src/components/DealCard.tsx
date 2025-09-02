type Deal = {
    id: number
    title?: string | null
    price?: number | null
    merchant?: string | null
    category?: string | null
    image_url?: string | null
}

export default function DealCard({ d }: { d: Deal }) {
    const title = d.title ?? `Deal #${d.id}`

    return (
        <li className="rounded-2xl border bg-white/5 p-4">
            <div className="flex gap-3">
                <img
                    src={d.image_url ?? '/placeholder.png'}
                    alt=""
                    className="w-20 h-20 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <div className="text-lg font-medium truncate">{title}</div>
                    <div className="text-sm opacity-80">
                        {d.merchant ?? '—'} • {d.category ?? '—'}
                    </div>
                    {d.price != null && (
                        <div className="mt-1 font-semibold">${Number(d.price).toFixed(2)}</div>
                    )}
                </div>
            </div>
        </li>
    )
}
