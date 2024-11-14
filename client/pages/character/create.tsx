import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface World {
  id: number;
  name: string;
}

const CreateCharacter: React.FC = () => {
  const [name, setName] = useState("Gandalf");
  const [nickname, setNickname] = useState("");
  const [type, setType] = useState("");
  const [world, setWorld] = useState<number | null>(null);
  const [classType, setClassType] = useState("");
  const [subclass, setSubclass] = useState("");
  const [secondClass, setSecondClass] = useState("");
  const [secondSubclass, setSecondSubclass] = useState("");
  const [species, setSpecies] = useState("");
  const [customSpecies, setCustomSpecies] = useState("");
  const [subSpecies, setSubSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [customGender, setCustomGender] = useState("");
  const [hair, setHair] = useState("");
  const [eyes, setEyes] = useState("");
  const [height, setHeight] = useState("");
  const [appearance, setAppearance] = useState("");
  const [visibility, setVisibility] = useState(1);
  const [worldList, setWorldList] = useState<World[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch available worlds for the dropdown
    axios.get("/api/world").then((response) => {
      setWorldList(response.data);
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/character", {
        name,
        nickname,
        type,
        world,
        class: classType,
        subclass,
        secondClass,
        secondSubclass,
        species,
        customSpecies,
        subSpecies,
        gender,
        customGender,
        hair,
        eyes,
        height,
        appearance,
        visibility,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to create Character:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6">Create Character</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Nickname */}
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Character Type */}
        <input
          type="text"
          placeholder="Character Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* World Dropdown */}
        <select
          value={world ?? ""}
          onChange={(e) =>
            setWorld(e.target.value ? Number(e.target.value) : null)
          }
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select World</option>
          {worldList.map((worldOption) => (
            <option key={worldOption.id} value={worldOption.id}>
              {worldOption.name}
            </option>
          ))}
        </select>

        {/* Class */}
        <input
          type="text"
          placeholder="Class"
          value={classType}
          onChange={(e) => setClassType(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Subclass */}
        <input
          type="text"
          placeholder="Subclass"
          value={subclass}
          onChange={(e) => setSubclass(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Second Class */}
        <input
          type="text"
          placeholder="Second Class"
          value={secondClass}
          onChange={(e) => setSecondClass(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Second Subclass */}
        <input
          type="text"
          placeholder="Second Subclass"
          value={secondSubclass}
          onChange={(e) => setSecondSubclass(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Species */}
        <input
          type="text"
          placeholder="Species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Custom Species */}
        <input
          type="text"
          placeholder="Custom Species"
          value={customSpecies}
          onChange={(e) => setCustomSpecies(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Subspecies */}
        <input
          type="text"
          placeholder="Subspecies"
          value={subSpecies}
          onChange={(e) => setSubSpecies(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Gender */}
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Custom Gender */}
        <input
          type="text"
          placeholder="Custom Gender"
          value={customGender}
          onChange={(e) => setCustomGender(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Hair */}
        <input
          type="text"
          placeholder="Hair"
          value={hair}
          onChange={(e) => setHair(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Eyes */}
        <input
          type="text"
          placeholder="Eyes"
          value={eyes}
          onChange={(e) => setEyes(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Height */}
        <input
          type="text"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Appearance */}
        <textarea
          placeholder="Appearance"
          value={appearance}
          onChange={(e) => setAppearance(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Visibility */}
        <input
          type="number"
          placeholder="Visibility"
          value={visibility}
          onChange={(e) => setVisibility(Number(e.target.value))}
          min={1}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded shadow-md transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCharacter;
