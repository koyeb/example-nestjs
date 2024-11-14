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
  bonus: string;
}

interface Relationship {
  id: number;
  visibility: number;
  tier: Tier | null;
  npc: Character;
  pc: Character;
}

const RelationshipPage: React.FC = () => {
  const [relationshipList, setRelationshipList] = useState<Relationship[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchRelationships();
  }, []);

  const fetchRelationships = async () => {
    try {
      const response = await axios.get("/api/relationship");
      setRelationshipList(response.data);
    } catch (error) {
      console.error("Failed to fetch Relationships:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/relationship/${id}`);
      setRelationshipList(
        relationshipList.filter((relationship) => relationship.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete Relationship:", error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Relationship List
      </h1>
      <button
        onClick={() => router.push("/relationship/create")}
        className="mb-6 px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
      >
        Create Relationship
      </button>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 p-3 text-left">ID</th>
            <th className="border border-gray-300 p-3 text-left">Visibility</th>
            <th className="border border-gray-300 p-3 text-left">Tier</th>
            <th className="border border-gray-300 p-3 text-left">NPC</th>
            <th className="border border-gray-300 p-3 text-left">PC</th>
            <th className="border border-gray-300 p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {relationshipList.map((relationship) => (
            <tr key={relationship.id} className="hover:bg-gray-100 transition">
              <td className="border border-gray-300 p-3">{relationship.id}</td>
              <td className="border border-gray-300 p-3">
                {relationship.visibility}
              </td>
              <td className="border border-gray-300 p-3">
                {relationship.tier ? relationship.tier.bonus : "No Tier"}
              </td>
              <td className="border border-gray-300 p-3">
                {relationship.npc.name}
              </td>
              <td className="border border-gray-300 p-3">
                {relationship.pc.name}
              </td>
              <td className="border border-gray-300 p-3 space-x-2">
                <button
                  onClick={() =>
                    router.push(`/relationship/${relationship.id}`)
                  }
                  className="px-3 py-1 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
                >
                  View
                </button>
                <button
                  onClick={() =>
                    router.push(`/relationship/edit/${relationship.id}`)
                  }
                  className="px-3 py-1 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(relationship.id)}
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

export default withAuth(RelationshipPage);
