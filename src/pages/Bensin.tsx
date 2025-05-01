import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";

interface Bensin {
  id: number;
  jenis_bensin: string;
  harga_per_liter: number;
  created_at: string;
  updated_at: string;
}

const Bensin = () => {
  const [bensinList, setBensinList] = useState<Bensin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchBensin = async () => {
    try {
      const response = await AxiosInstance.get("/api/bensin");
      setBensinList(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch bensin data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBensin();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await AxiosInstance.delete(`/api/bensin/${id}`);
        fetchBensin(); // Refresh the list
      } catch (err) {
        setError("Failed to delete bensin");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bensin Management</h1>
        <button
          onClick={() => navigate("/add-bensin")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Bensin
        </button>
      </div>

      <div className="grid gap-4">
        {bensinList.map((bensin) => (
          <div
            key={bensin.id}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{bensin.jenis_bensin}</h2>
                <p className="text-gray-600">
                  Price: Rp {bensin.harga_per_liter}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => navigate(`/edit-bensin/${bensin.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(bensin.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bensin;
