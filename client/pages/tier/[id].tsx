import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface Character {
  id: number;
  name: string;
}

interface Tier {
  id: number;
  level: number;
  bonus: string | null;
  npc: Character | null;
}

const TierDetails: React.FC = () => {
  const [tier, setTier] = useState<Tier | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/tier/${id}`).then((response) => {
        setTier(response.data);
      });
    }
  }, [id]);

  if (!tier) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        Tier ID: {tier.id}
      </h1>

      <div className="space-y-3">
        <p>
          <span className="font-semibold text-gray-700">Level:</span>{" "}
          {tier.level}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Bonus:</span>{" "}
          {tier.bonus || "No bonus provided"}
        </p>
        <p>
          <span className="font-semibold text-gray-700">NPC:</span>{" "}
          {tier.npc ? tier.npc.name : "No NPC assigned"}
        </p>
      </div>

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-6 px-4 py-2 bg-blue-500 text-white font-bold rounded shadow-lg transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
      >
        Back to List
      </button>
    </div>
  );
};

export default TierDetails;
