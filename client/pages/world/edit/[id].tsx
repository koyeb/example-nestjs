import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const EditWorld: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.get(`/api/world/${id}`).then((response) => {
        const world = response.data;
        setName(world.name);
        setDescription(world.description);
      });
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/world/${id}`, { name, description });
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update World:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-6">Edit World</h1>
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

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded shadow-md transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          Update World
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="w-full mt-3 bg-gray-500 text-white font-bold py-2 rounded shadow-md transition duration-300 hover:bg-gray-600 focus:ring-2 focus:ring-gray-300"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditWorld;
