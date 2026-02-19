"use client"

import { MessageSquare, ArrowBigUp, Trash2 } from "lucide-react"

interface DealCardProps {
    title: string
    price: string
    originalPrice: string
    rating: number
    description: string
    comments: number
}

export default function DealCard({ title, price, originalPrice, rating, description, comments }: DealCardProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] shadow-sm backdrop-blur-md transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[var(--shadow)]">
            <div className="p-5">
                <div className="flex justify-between">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <div className="flex items-center gap-1 font-extrabold text-amber-500">
                        <span>★</span> {rating}
                    </div>
                </div>

                <div className="my-3 flex items-baseline gap-3">
                    <span className="text-2xl font-extrabold text-[var(--accent)]">{price}</span>
                    <span className="text-sm text-[var(--text-muted)] line-through">{originalPrice}</span>
                </div>

                <p className="text-sm text-[var(--text-muted)]">{description}</p>
            </div>

            <div className="flex items-center gap-4 bg-black/5 px-5 py-3 border-t border-[var(--border)]">
                <button className="flex items-center gap-1 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent)]">
                    <ArrowBigUp size={20} /> Vote
                </button>
                <button className="flex items-center gap-1 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent)]">
                    <MessageSquare size={18} /> {comments} Comments
                </button>

                {/* Delete placeholder - would be guarded by auth in real app */}
                <button className="ml-auto text-red-500 hover:text-red-600">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    )
}
