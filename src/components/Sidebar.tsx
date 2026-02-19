export default function Sidebar() {
    return (
        <aside className="hidden w-[320px] lg:block">
            <div className="sticky top-[100px] rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5">
                <h3 className="mb-5 font-['Space_Grotesk'] text-lg font-bold">✨ Star Chart (Top Rated)</h3>

                <div className="flex flex-col gap-4">
                    <RankingItem rank="01" name="MacBook M3 Pro" points="+2,450" />
                    <RankingItem rank="02" name="Sony PS5 Slim Bundle" points="+1,820" />
                    <RankingItem rank="03" name="NordVPN 2-Year Plan" points="+1,105" />
                </div>

                <button className="mt-5 w-full rounded-lg border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)] hover:bg-[var(--bg)]">
                    View Full Leaderboard
                </button>
            </div>
        </aside>
    )
}

function RankingItem({ rank, name, points }: { rank: string; name: string; points: string }) {
    return (
        <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3 last:border-0 last:pb-0">
            <span className="font-['Space_Grotesk'] text-xl font-bold text-[var(--accent)] opacity-50">{rank}</span>
            <div>
                <div className="text-sm font-semibold">{name}</div>
                <div className="text-xs text-emerald-500">{points} points</div>
            </div>
        </div>
    )
}
