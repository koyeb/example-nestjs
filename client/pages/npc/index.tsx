import withAuth from "../../hoc/withAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface NPC {
  id: number;
  name: string;
  role: string;
  description: string;
  level: number;
}

const NPCPage: React.FC = () => {
  const [npcList, setNpcList] = useState<NPC[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchNPCs();
  }, []);

  const fetchNPCs = async () => {
    try {
      const response = await axios.get("/api/npc");
      setNpcList(response.data);
    } catch (error) {
      console.error("Failed to fetch NPCs:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/npc/${id}`);
      setNpcList(npcList.filter((npc) => npc.id !== id));
    } catch (error) {
      console.error("Failed to delete NPC:", error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        NPC List
      </h1>
      <button
        onClick={() => router.push("/npc/create")}
        className="mb-6 px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
      >
        Create NPC
      </button>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 p-3 text-left">ID</th>
            <th className="border border-gray-300 p-3 text-left">Name</th>
            <th className="border border-gray-300 p-3 text-left">Role</th>
            <th className="border border-gray-300 p-3 text-left">Level</th>
            <th className="border border-gray-300 p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {npcList.map((npc) => (
            <tr key={npc.id} className="hover:bg-gray-100 transition">
              <td className="border border-gray-300 p-3">{npc.id}</td>
              <td className="border border-gray-300 p-3">{npc.name}</td>
              <td className="border border-gray-300 p-3">{npc.role}</td>
              <td className="border border-gray-300 p-3">{npc.level}</td>
              <td className="border border-gray-300 p-3 space-x-2">
                <button
                  onClick={() => router.push(`/npc/${npc.id}`)}
                  className="px-3 py-1 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
                >
                  View
                </button>
                <button
                  onClick={() => router.push(`/npc/edit/${npc.id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(npc.id)}
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

export default withAuth(NPCPage);
