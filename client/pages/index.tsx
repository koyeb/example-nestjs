import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Welcome to the App
      </h1>

      <Link
        href="/auth"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded shadow-md transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
      >
        Go to Login/Register
      </Link>
    </div>
  );
};

export default Home;
