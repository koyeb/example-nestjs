import withAuth from "../../hoc/withAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Character {
  id: number;
  name: string;
  role: string;
  description: string;
  level: number;
}

const CharacterPage: React.FC = () => {
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get("/api/character");
      setCharacterList(response.data);
    } catch (error) {
      console.error("Failed to fetch Characters:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/character/${id}`);
      setCharacterList(characterList.filter((character) => character.id !== id));
    } catch (error) {
      console.error("Failed to delete Character:", error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Character List
      </h1>
      <button
        onClick={() => router.push("/character/create")}
        className="mb-6 px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
      >
        Create Character
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
          {characterList.map((character) => (
            <tr key={character.id} className="hover:bg-gray-100 transition">
              <td className="border border-gray-300 p-3">{character.id}</td>
              <td className="border border-gray-300 p-3">{character.name}</td>
              <td className="border border-gray-300 p-3">{character.role}</td>
              <td className="border border-gray-300 p-3">{character.level}</td>
              <td className="border border-gray-300 p-3 space-x-2">
                <button
                  onClick={() => router.push(`/character/${character.id}`)}
                  className="px-3 py-1 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
                >
                  View
                </button>
                <button
                  onClick={() => router.push(`/character/edit/${character.id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(character.id)}
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

export default withAuth(CharacterPage);
