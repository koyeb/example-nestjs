import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface Tier {
  id: number;
  bonus: string;
}

interface Character {
  id: number;
  name: string;
}

interface Relationship {
  id: number;
  visibility: number;
  tier: Tier | null;
  npc: Character;
  pc: Character;
}

const RelationshipDetails: React.FC = () => {
  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/relationship/${id}`).then((response) => {
        setRelationship(response.data);
      });
    }
  }, [id]);

  if (!relationship) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        Relationship ID: {relationship.id}
      </h1>

      <div className="space-y-3">
        <p>
          <span className="font-semibold text-gray-700">Visibility:</span>{" "}
          {relationship.visibility}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Tier:</span>{" "}
          {relationship.tier ? relationship.tier.bonus : "No Tier"}
        </p>
        <p>
          <span className="font-semibold text-gray-700">NPC:</span>{" "}
          {relationship.npc.name}
        </p>
        <p>
          <span className="font-semibold text-gray-700">PC:</span>{" "}
          {relationship.pc.name}
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

export default RelationshipDetails;
