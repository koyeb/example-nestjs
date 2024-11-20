import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface Character {
  id: number;
  name: string;
  nickname: string | null;
  type: { id: number; desc: string } | null;
  world: { id: number; name: string } | null;
  class: { id: number; desc: string } | null;
  subclass: string | null;
  secondClass: { id: number; desc: string } | null;
  secondSubclass: string | null;
  species: { id: number; desc: string } | null;
  customSpecies: string | null;
  subSpecies: string | null;
  gender: { id: number; desc: string } | null;
  customGender: string | null;
  hair: string | null;
  eyes: string | null;
  height: string | null;
  appearance: string | null;
  visibility: { id: number; desc: string } | null;
}

const CharacterDetails: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/character/${id}`).then((response) => {
        setCharacter(response.data);
      });
    }
  }, [id]);

  if (!character) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-3xl font-bold mb-6">{character.name}</h1>

      <div className="space-y-4">
        <p>
          <span className="font-semibold text-gray-700">Nickname:</span>{" "}
          {character.nickname || "N/A"}
        </p>

        <p>
          <span className="font-semibold text-gray-700">Character Type:</span>{" "}
          {character.type?.desc || "N/A"}
        </p>

        <p>
          <span className="font-semibold text-gray-700">World:</span>{" "}
          {character.world?.name || "N/A"}
        </p>

        <p>
          <span className="font-semibold text-gray-700">Class:</span>{" "}
          {character.class?.desc || "N/A"}
          {character.subclass && ` (${character.subclass})`}
        </p>

        {character.secondClass && (
          <p>
            <span className="font-semibold text-gray-700">Second Class:</span>{" "}
            {character.secondClass.desc}
            {character.secondSubclass && ` (${character.secondSubclass})`}
          </p>
        )}

        <p>
          <span className="font-semibold text-gray-700">Species:</span>{" "}
          {character.species?.desc === 'Custom' 
            ? character.customSpecies 
            : character.species?.desc || "N/A"}
          {character.subSpecies && ` (${character.subSpecies})`}
        </p>

        <p>
          <span className="font-semibold text-gray-700">Gender:</span>{" "}
          {character.gender?.desc === 'Custom'
            ? character.customGender
            : character.gender?.desc || "N/A"}
        </p>

        <p>
          <span className="font-semibold text-gray-700">Hair:</span>{" "}
          {character.hair || "N/A"}
        </p>

        <p>
          <span className="font-semibold text-gray-700">Eyes:</span>{" "}
          {character.eyes || "N/A"}
        </p>

        <p>
          <span className="font-semibold text-gray-700">Height:</span>{" "}
          {character.height || "N/A"}
        </p>

        <div>
          <span className="font-semibold text-gray-700">Appearance:</span>
          <p className="mt-2 whitespace-pre-wrap">
            {character.appearance || "No appearance description provided."}
          </p>
        </div>

        <p>
          <span className="font-semibold text-gray-700">Visibility:</span>{" "}
          {character.visibility?.desc || "N/A"}
        </p>
      </div>

      <div className="mt-8 space-x-4">
        <button
          onClick={() => router.push(`/character/edit/${character.id}`)}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Edit Character
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CharacterDetails;
