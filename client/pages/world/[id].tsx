import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface World {
  id: number;
  name: string;
  description: string;
}

const WorldDetails: React.FC = () => {
  const [world, setWorld] = useState<World | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/world/${id}`).then((response) => {
        setWorld(response.data);
      });
    }
  }, [id]);

  if (!world) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">{world.name}</h1>

      <div className="space-y-3">
        <p>
          <span className="font-semibold text-gray-700">Description:</span>{" "}
          {world.description || "No description provided."}
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

export default WorldDetails;
