"use client"

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import DealCard from "@/components/DealCard";
import { Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

interface Deal {
  id: string;
  title: string;
  description: string;
  price: string;
  original_price: string;
  votes_count: number;
  comments_count: number;
}

const PLACEHOLDER_DEALS: Deal[] = [
  {
    id: "p1",
    title: "RTX 4080 Super - Founders Edition",
    description: "Best price seen this year. Available at NVIDIA store.",
    price: "$999",
    original_price: "$1,199",
    votes_count: 50,
    comments_count: 12
  },
  {
    id: "p2",
    title: "Starfield: Premium Edition (PC/Xbox)",
    description: "Global Steam Key on sale for the next 24 hours.",
    price: "$45",
    original_price: "$99",
    votes_count: 35,
    comments_count: 89
  }
];

export default function Home() {
  const { user } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    async function fetchDeals() {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setDeals(data);
      } else {
        // Fallback to placeholders if DB is empty
        setDeals(PLACEHOLDER_DEALS);
      }
    }

    fetchDeals();
  }, []);

  const handlePostOffer = () => {
    if (!user) {
      alert("Please login first via the button in the top right corner!");
    } else {
      alert("Post functionality created! Your User ID is: " + user.id);
    }
  };

  return (
    <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-10 lg:grid-cols-[1fr_320px]">
      <main>
        <header className="mb-8">
          <h1 className="font-['Space_Grotesk'] text-4xl font-bold">Trending Promotions</h1>
          <p className="text-[var(--text-muted)]">Community curated deals from across the web.</p>
          <button
            onClick={handlePostOffer}
            className="mt-4 flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 font-semibold text-white transition hover:opacity-90"
          >
            <Plus size={18} /> Post New Offer
          </button>
        </header>

        <div className="grid gap-5">
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              title={deal.title}
              // Simple heuristic for rating based on title for the placeholders, default 4.5 otherwise
              rating={deal.title.includes("RTX") ? 4.9 : deal.title.includes("Starfield") ? 4.2 : 4.5}
              price={deal.price.toString().startsWith('$') ? deal.price : `$${deal.price}`}
              originalPrice={deal.original_price.toString().startsWith('$') ? deal.original_price : `$${deal.original_price}`}
              description={deal.description}
              comments={deal.comments_count}
            />
          ))}
        </div>
      </main>

      <Sidebar />
    </div>
  );
}
