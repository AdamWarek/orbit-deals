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

export default function Home() {
  const { user } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    async function fetchDeals() {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setDeals(data);
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
          {deals.length === 0 ? (
            <div className="text-center py-10 text-[var(--text-muted)]">
              <p>No deals found. Be the first to post one!</p>
            </div>
          ) : (
            deals.map((deal) => (
              <DealCard
                key={deal.id}
                title={deal.title}
                rating={4.5} // Placeholder rating logic
                price={deal.price}
                originalPrice={deal.original_price}
                description={deal.description}
                comments={deal.comments_count}
              />
            ))
          )}
        </div>
      </main>

      <Sidebar />
    </div>
  );
}
