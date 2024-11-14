import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Tier {
  id: number;
  bonus: string;
}

interface Character {
  id: number;
  name: string;
}

const EditRelationship: React.FC = () => {
  const [visibility, setVisibility] = useState(0);
  const [tier, setTier] = useState<number | null>(null);
  const [npc, setNpc] = useState<number | null>(null);
  const [pc, setPc] = useState<number | null>(null);
  const [tierList, setTierList] = useState<Tier[]>([]);
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/relationship/${id}`).then((response) => {
        const relationship = response.data;
        setVisibility(relationship.visibility);
        setTier(relationship.tier ? relationship.tier.id : null);
        setNpc(relationship.npc.id);
        setPc(relationship.pc.id);
      });
    }

    axios.get("/api/tier").then((response) => setTierList(response.data));
    axios
      .get("/api/character")
      .then((response) => setCharacterList(response.data));
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/relationship/${id}`, { visibility, tier, npc, pc });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update Relationship:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6">Edit Relationship</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Visibility */}
        <input
          type="number"
          placeholder="Visibility"
          value={visibility}
          onChange={(e) => setVisibility(Number(e.target.value))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Tier Dropdown */}
        <select
          value={tier ?? ""}
          onChange={(e) =>
            setTier(e.target.value ? Number(e.target.value) : null)
          }
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Tier</option>
          {tierList.map((tierOption) => (
            <option key={tierOption.id} value={tierOption.id}>
              {tierOption.bonus}
            </option>
          ))}
        </select>

        {/* NPC Dropdown */}
        <select
          value={npc ?? ""}
          onChange={(e) =>
            setNpc(e.target.value ? Number(e.target.value) : null)
          }
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select NPC</option>
          {characterList.map((character) => (
            <option key={character.id} value={character.id}>
              {character.name}
            </option>
          ))}
        </select>

        {/* PC Dropdown */}
        <select
          value={pc ?? ""}
          onChange={(e) =>
            setPc(e.target.value ? Number(e.target.value) : null)
          }
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select PC</option>
          {characterList.map((character) => (
            <option key={character.id} value={character.id}>
              {character.name}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded shadow-md transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          Update Relationship
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

export default EditRelationship;
