import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface Character {
  id: number;
  name: string;
  nickname: string;
  type: string;
  class: string;
  subclass: string;
  species: string;
  customSpecies: string;
  subSpecies: string;
  gender: string;
  customGender: string;
  hair: string;
  eyes: string;
  height: string;
  appearance: string;
  visibility: number;
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
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        {character.name}
      </h1>

      <div className="space-y-3">
        <p>
          <span className="font-semibold text-gray-700">Nickname:</span>{" "}
          {character.nickname || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Character Type:</span>{" "}
          {character.type || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Class:</span>{" "}
          {character.class || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Subclass:</span>{" "}
          {character.subclass || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Species:</span>{" "}
          {character.species || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Custom Species:</span>{" "}
          {character.customSpecies || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Subspecies:</span>{" "}
          {character.subSpecies || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Gender:</span>{" "}
          {character.gender || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Custom Gender:</span>{" "}
          {character.customGender || "N/A"}
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
        <p>
          <span className="font-semibold text-gray-700">Appearance:</span>{" "}
          {character.appearance || "No appearance description provided."}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Visibility:</span>{" "}
          {character.visibility}
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

export default CharacterDetails;
