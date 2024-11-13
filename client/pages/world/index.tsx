import withAuth from "../../hoc/withAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface World {
  id: number;
  name: string;
  description: string;
}

const WorldPage: React.FC = () => {
  const [worldList, setWorldList] = useState<World[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchWorlds();
  }, []);

  const fetchWorlds = async () => {
    try {
      const response = await axios.get("/api/world");
      setWorldList(response.data);
    } catch (error) {
      console.error("Failed to fetch Worlds:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/world/${id}`);
      setWorldList(worldList.filter((world) => world.id !== id));
    } catch (error) {
      console.error("Failed to delete World:", error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        World List
      </h1>
      <button
        onClick={() => router.push("/world/create")}
        className="mb-6 px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
      >
        Create World
      </button>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 p-3 text-left">ID</th>
            <th className="border border-gray-300 p-3 text-left">Name</th>
            <th className="border border-gray-300 p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {worldList.map((world) => (
            <tr key={world.id} className="hover:bg-gray-100 transition">
              <td className="border border-gray-300 p-3">{world.id}</td>
              <td className="border border-gray-300 p-3">{world.name}</td>
              <td className="border border-gray-300 p-3 space-x-2">
                <button
                  onClick={() => router.push(`/world/${world.id}`)}
                  className="px-3 py-1 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
                >
                  View
                </button>
                <button
                  onClick={() => router.push(`/world/edit/${world.id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(world.id)}
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

export default withAuth(WorldPage);
