import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface Character {
  id: number;
  name: string;
  nickname: string | null;
  type: { id: number; desc: string } | null;
  class: { id: number; desc: string } | null;
  species: { id: number; desc: string } | null;
  customSpecies: string | null;
  visibility: { id: number; desc: string } | null;
}

const CharacterPage: React.FC = () => {
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/character").then((response) => {
      setCharacterList(response.data);
    });
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this character?")) {
      try {
        await axios.delete(`/api/character/${id}`);
        setCharacterList(characterList.filter((char) => char.id !== id));
      } catch (error) {
        console.error("Failed to delete character:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Characters</h1>

      <button
        onClick={() => router.push("/character/create")}
        className="mb-6 px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
      >
        Create Character
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 p-3 text-left">ID</th>
              <th className="border border-gray-300 p-3 text-left">Name</th>
              <th className="border border-gray-300 p-3 text-left">Nickname</th>
              <th className="border border-gray-300 p-3 text-left">Type</th>
              <th className="border border-gray-300 p-3 text-left">Class</th>
              <th className="border border-gray-300 p-3 text-left">Species</th>
              <th className="border border-gray-300 p-3 text-left">Visibility</th>
              <th className="border border-gray-300 p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {characterList.map((character) => (
              <tr key={character.id} className="hover:bg-gray-100 transition">
                <td className="border border-gray-300 p-3">{character.id}</td>
                <td className="border border-gray-300 p-3">{character.name}</td>
                <td className="border border-gray-300 p-3">
                  {character.nickname || "N/A"}
                </td>
                <td className="border border-gray-300 p-3">
                  {character.type?.desc || "N/A"}
                </td>
                <td className="border border-gray-300 p-3">
                  {character.class?.desc || "N/A"}
                </td>
                <td className="border border-gray-300 p-3">
                  {character.species?.desc === 'Custom'
                    ? character.customSpecies
                    : character.species?.desc || "N/A"}
                </td>
                <td className="border border-gray-300 p-3">
                  {character.visibility?.desc || "N/A"}
                </td>
                <td className="border border-gray-300 p-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => router.push(`/character/${character.id}`)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => router.push(`/character/edit/${character.id}`)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(character.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CharacterPage;
