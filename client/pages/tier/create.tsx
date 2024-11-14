import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface NPC {
  id: number;
  name: string;
}

const CreateTier: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [bonus, setBonus] = useState("");
  const [npc, setNpc] = useState<number | null>(null);
  const [npcList, setNpcList] = useState<NPC[]>([]); // List of available NPCs
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/character")
      .then((response) => {
        setNpcList(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch NPCs:", error);
      });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/tier", {
        level,
        bonus,
        npc,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create Tier:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6">Create Tier</h1>
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
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTier;
