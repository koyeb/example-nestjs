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
  visibility: {
    id: number;
    desc: string;
  } | null;
  tier: {
    id: number;
    level: number;
    bonus: string;
  } | null;
  npc: Character;
  pc: Character;
}

const RelationshipPage: React.FC = () => {
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/relationship").then((response) => {
      setRelationships(response.data);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Relationships</h1>
        <button
          onClick={() => router.push("/relationship/create")}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded shadow-lg transition duration-300 hover:bg-blue-600"
        >
          Create New
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {relationships.map((relationship) => (
          <div
            key={relationship.id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              {relationship.npc.name} ↔ {relationship.pc.name}
            </h2>
            <p className="text-gray-600">
              Visibility: {relationship.visibility?.desc || "Not set"}
            </p>
            <p className="text-gray-600">
              Tier: {relationship.tier ? `Level ${relationship.tier.level}` : "None"}
            </p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => router.push(`/relationship/${relationship.id}`)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View
              </button>
              <button
                onClick={() => router.push(`/relationship/edit/${relationship.id}`)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(RelationshipPage);
