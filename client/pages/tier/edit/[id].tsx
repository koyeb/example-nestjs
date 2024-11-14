import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface NPC {
  id: number;
  name: string;
}

const EditTier: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [bonus, setBonus] = useState("");
  const [npc, setNpc] = useState<number | null>(null);
  const [npcList, setNpcList] = useState<NPC[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/tier/${id}`).then((response) => {
        const tier = response.data;
        setLevel(tier.level);
        setBonus(tier.bonus || "");
        setNpc(tier.npc ? tier.npc.id : null);
      });
    }

    axios.get("/api/character").then((response) => {
      setNpcList(response.data);
    });
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/tier/${id}`, { level, bonus, npc });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update Tier:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6">Edit Tier</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Level */}
        <input
          type="number"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Bonus */}
        <textarea
          placeholder="Bonus"
          value={bonus}
          onChange={(e) => setBonus(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* NPC Dropdown */}
        <select
          value={npc ?? ""}
          onChange={(e) =>
            setNpc(e.target.value ? Number(e.target.value) : null)
          }
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select NPC</option>
          {npcList.map((npcOption) => (
            <option key={npcOption.id} value={npcOption.id}>
              {npcOption.name}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded shadow-md transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          Update Tier
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-full mt-3 bg-gray-500 text-white font-bold py-2 rounded shadow-md transition duration-300 hover:bg-gray-600 focus:ring-2 focus:ring-gray-300"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTier;
