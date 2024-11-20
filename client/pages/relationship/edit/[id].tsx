import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Character {
  id: number;
  name: string;
}

interface Tier {
  id: number;
  level: number;
  bonus: string;
}

interface Visibility {
  id: number;
  desc: string;
}

const EditRelationship: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [visibility, setVisibility] = useState<number | null>(null);
  const [tier, setTier] = useState<number | null>(null);
  const [npc, setNpc] = useState<number | null>(null);
  const [pc, setPc] = useState<number | null>(null);

  // Lists for dropdowns
  const [visibilityList, setVisibilityList] = useState<Visibility[]>([]);
  const [tierList, setTierList] = useState<Tier[]>([]);
  const [characterList, setCharacterList] = useState<Character[]>([]);

  useEffect(() => {
    // Fetch all dropdown data
    Promise.all([
      axios.get("/api/visibility"),
      axios.get("/api/tier"),
      axios.get("/api/character"),
    ]).then(([visibilitiesRes, tiersRes, charactersRes]) => {
      setVisibilityList(visibilitiesRes.data);
      setTierList(tiersRes.data);
      setCharacterList(charactersRes.data);
    });

    // Fetch relationship data if ID exists
    if (id) {
      axios.get(`/api/relationship/${id}`).then((response) => {
        const relationship = response.data;
        setVisibility(relationship.visibility?.id || null);
        setTier(relationship.tier?.id || null);
        setNpc(relationship.npc.id);
        setPc(relationship.pc.id);
      });
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/relationship/${id}`, {
        visibility,
        tier,
        npc,
        pc,
      });
      router.push("/relationship");
    } catch (error) {
      console.error("Failed to update relationship:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6">Edit Relationship</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Visibility Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Visibility
          </label>
          <select
            value={visibility || ""}
            onChange={(e) => setVisibility(e.target.value ? Number(e.target.value) : null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          >
            <option value="">Select Visibility</option>
            {visibilityList.map((v) => (
              <option key={v.id} value={v.id}>
                {v.desc}
              </option>
            ))}
          </select>
        </div>

        {/* Tier Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tier
          </label>
          <select
            value={tier || ""}
            onChange={(e) => setTier(e.target.value ? Number(e.target.value) : null)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          >
            <option value="">Select Tier</option>
            {tierList.map((t) => (
              <option key={t.id} value={t.id}>
                Level {t.level} - {t.bonus}
              </option>
            ))}
          </select>
        </div>

        {/* NPC Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            NPC
          </label>
          <select
            value={npc || ""}
            onChange={(e) => setNpc(Number(e.target.value))}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          >
            <option value="">Select NPC</option>
            {characterList.map((char) => (
              <option key={char.id} value={char.id}>
                {char.name}
              </option>
            ))}
          </select>
        </div>

        {/* PC Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            PC
          </label>
          <select
            value={pc || ""}
            onChange={(e) => setPc(Number(e.target.value))}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
          >
            <option value="">Select PC</option>
            {characterList.map((char) => (
              <option key={char.id} value={char.id}>
                {char.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white font-bold py-2 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => router.push("/relationship")}
            className="flex-1 bg-gray-500 text-white font-bold py-2 rounded shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRelationship;
