import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface World {
  id: number;
  name: string;
}

interface CharType {
  id: number;
  desc: string;
}

interface Class {
  id: number;
  desc: string;
}

interface Species {
  id: number;
  desc: string;
}

interface Gender {
  id: number;
  desc: string;
}

interface Visibility {
  id: number;
  desc: string;
}

const CreateCharacter: React.FC = () => {
  const [name, setName] = useState("Gandalf");
  const [nickname, setNickname] = useState("");
  const [type, setType] = useState<number | null>(null);
  const [world, setWorld] = useState<number | null>(null);
  const [classType, setClassType] = useState<number | null>(null);
  const [subclass, setSubclass] = useState("");
  const [secondClass, setSecondClass] = useState<number | null>(null);
  const [secondSubclass, setSecondSubclass] = useState("");
  const [species, setSpecies] = useState<number | null>(null);
  const [customSpecies, setCustomSpecies] = useState("");
  const [subSpecies, setSubSpecies] = useState("");
  const [gender, setGender] = useState<number | null>(null);
  const [customGender, setCustomGender] = useState("");
  const [hair, setHair] = useState("");
  const [eyes, setEyes] = useState("");
  const [height, setHeight] = useState("");
  const [appearance, setAppearance] = useState("");
  const [visibility, setVisibility] = useState<number | null>(null);

  // Lists for dropdowns
  const [worldList, setWorldList] = useState<World[]>([]);
  const [charTypeList, setCharTypeList] = useState<CharType[]>([]);
  const [classList, setClassList] = useState<Class[]>([]);
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [genderList, setGenderList] = useState<Gender[]>([]);
  const [visibilityList, setVisibilityList] = useState<Visibility[]>([]);

  const router = useRouter();

  useEffect(() => {
    // Fetch all required data for dropdowns
    const fetchData = async () => {
      try {
        const [
          worldsRes,
          charTypesRes,
          classesRes,
          speciesRes,
          gendersRes,
          visibilitiesRes
        ] = await Promise.all([
          axios.get("/api/world"),
          axios.get("/api/char-type"),
          axios.get("/api/classes"),
          axios.get("/api/species"),
          axios.get("/api/gender"),
          axios.get("/api/visibility")
        ]);

        setWorldList(worldsRes.data);
        setCharTypeList(charTypesRes.data);
        setClassList(classesRes.data);
        setSpeciesList(speciesRes.data);
        setGenderList(gendersRes.data);
        setVisibilityList(visibilitiesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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
          className="w-full px-4 py-2 border rounded"
        />

        {/* Nickname */}
        <input
          type="text"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        {/* Character Type */}
        <select
          value={type || ""}
          onChange={(e) => setType(e.target.value ? Number(e.target.value) : null)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Character Type</option>
          {charTypeList.map((charType) => (
            <option key={charType.id} value={charType.id}>
              {charType.desc}
            </option>
          ))}
        </select>

        {/* World */}
        <select
          value={world || ""}
          onChange={(e) => setWorld(e.target.value ? Number(e.target.value) : null)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select World</option>
          {worldList.map((worldItem) => (
            <option key={worldItem.id} value={worldItem.id}>
              {worldItem.name}
            </option>
          ))}
        </select>

        {/* Class */}
        <select
          value={classType || ""}
          onChange={(e) => setClassType(e.target.value ? Number(e.target.value) : null)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Class</option>
          {classList.map((classItem) => (
            <option key={classItem.id} value={classItem.id}>
              {classItem.desc}
            </option>
          ))}
        </select>

        {/* Subclass */}
        <input
          type="text"
          placeholder="Subclass"
          value={subclass}
          onChange={(e) => setSubclass(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        {/* Second Class */}
        <select
          value={secondClass || ""}
          onChange={(e) => setSecondClass(e.target.value ? Number(e.target.value) : null)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Second Class</option>
          {classList.map((classItem) => (
            <option key={classItem.id} value={classItem.id}>
              {classItem.desc}
            </option>
          ))}
        </select>

        {/* Second Subclass */}
        <input
          type="text"
          placeholder="Second Subclass"
          value={secondSubclass}
          onChange={(e) => setSecondSubclass(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        {/* Species */}
        <select
          value={species || ""}
          onChange={(e) => setSpecies(e.target.value ? Number(e.target.value) : null)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Species</option>
          {speciesList.map((speciesItem) => (
            <option key={speciesItem.id} value={speciesItem.id}>
              {speciesItem.desc}
            </option>
          ))}
        </select>

        {/* Custom Species (show only if Species is "Custom") */}
        {species === speciesList.find(s => s.desc === 'Custom')?.id && (
          <input
            type="text"
            placeholder="Custom Species"
            value={customSpecies}
            onChange={(e) => setCustomSpecies(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        )}

        {/* Subspecies */}
        <input
          type="text"
          placeholder="Subspecies"
          value={subSpecies}
          onChange={(e) => setSubSpecies(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        {/* Gender */}
        <select
          value={gender || ""}
          onChange={(e) => setGender(e.target.value ? Number(e.target.value) : null)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Gender</option>
          {genderList.map((genderItem) => (
            <option key={genderItem.id} value={genderItem.id}>
              {genderItem.desc}
            </option>
          ))}
        </select>

        {/* Custom Gender (show only if Gender is "Custom") */}
        {gender === genderList.find(g => g.desc === 'Custom')?.id && (
          <input
            type="text"
            placeholder="Custom Gender"
            value={customGender}
            onChange={(e) => setCustomGender(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        )}

        {/* Other fields */}
        <input
          type="text"
          placeholder="Hair"
          value={hair}
          onChange={(e) => setHair(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="text"
          placeholder="Eyes"
          value={eyes}
          onChange={(e) => setEyes(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="text"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />

        <textarea
          placeholder="Appearance"
          value={appearance}
          onChange={(e) => setAppearance(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          rows={4}
        />

        {/* Visibility */}
        <select
          value={visibility || ""}
          onChange={(e) => setVisibility(e.target.value ? Number(e.target.value) : null)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Visibility</option>
          {visibilityList.map((visibilityItem) => (
            <option key={visibilityItem.id} value={visibilityItem.id}>
              {visibilityItem.desc}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Character
        </button>
      </form>
    </div>
  );
};

export default CreateCharacter;
