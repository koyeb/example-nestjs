import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface NPC {
  id: number;
  name: string;
  role: string;
  description: string;
  level: number;
}

const NPCDetails: React.FC = () => {
  const [npc, setNpc] = useState<NPC | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/npc/${id}`).then((response) => {
        setNpc(response.data);
      });
    }
  }, [id]);

  if (!npc) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">{npc.name}</h1>

      <div className="space-y-3">
        <p>
          <span className="font-semibold text-gray-700">Role:</span> {npc.role}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Level:</span>{" "}
          {npc.level}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Description:</span>{" "}
          {npc.description || "No description provided."}
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

export default NPCDetails;
