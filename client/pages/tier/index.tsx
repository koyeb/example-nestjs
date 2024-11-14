import withAuth from "../../hoc/withAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

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

const TierPage: React.FC = () => {
  const [tierList, setTierList] = useState<Tier[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      const response = await axios.get("/api/tier");
      setTierList(response.data);
    } catch (error) {
      console.error("Failed to fetch Tiers:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/tier/${id}`);
      setTierList(tierList.filter((tier) => tier.id !== id));
    } catch (error) {
      console.error("Failed to delete Tier:", error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Tier List
      </h1>
      <button
        onClick={() => router.push("/tier/create")}
        className="mb-6 px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
      >
        Create Tier
      </button>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 p-3 text-left">ID</th>
            <th className="border border-gray-300 p-3 text-left">Level</th>
            <th className="border border-gray-300 p-3 text-left">Bonus</th>
            <th className="border border-gray-300 p-3 text-left">NPC</th>
            <th className="border border-gray-300 p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tierList.map((tier) => (
            <tr key={tier.id} className="hover:bg-gray-100 transition">
              <td className="border border-gray-300 p-3">{tier.id}</td>
              <td className="border border-gray-300 p-3">{tier.level}</td>
              <td className="border border-gray-300 p-3">
                {tier.bonus || "No bonus"}
              </td>
              <td className="border border-gray-300 p-3">
                {tier.npc ? tier.npc.name : "No NPC"}
              </td>
              <td className="border border-gray-300 p-3 space-x-2">
                <button
                  onClick={() => router.push(`/tier/${tier.id}`)}
                  className="px-3 py-1 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
                >
                  View
                </button>
                <button
                  onClick={() => router.push(`/tier/edit/${tier.id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tier.id)}
                  className="px-3 py-1 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withAuth(TierPage);
