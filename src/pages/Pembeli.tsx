import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";

interface Pembeli {
  id: number;
  jenis_bensin: string;
  jenis_kendaraan: string;
  created_at: string;
  updated_at: string;
}

const Pembeli = () => {
  const [records, setRecords] = useState<Pembeli[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchRecords = async () => {
    try {
      const response = await AxiosInstance.get("/api/pembeli");
      setRecords(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch customer records");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await AxiosInstance.delete(`/api/pembeli/${id}`);
        fetchRecords(); // Refresh the list
      } catch (err) {
        setError("Failed to delete record");
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Records</h1>
        <button
          onClick={() => navigate("/add-pembeli")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Record
        </button>
      </div>

      <div className="grid gap-4">
        {records.map((record) => (
          <div
            key={record.id}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">
                  Fuel Type: {record.jenis_bensin}
                </h2>
                <div className="mt-2 space-y-1">
                  <p className="text-gray-600">
                    Vehicle Type: {record.jenis_kendaraan}
                  </p>
                  <p className="text-gray-600">
                    Purchase Time: {formatDate(record.created_at)}
                  </p>
                  <p className="text-gray-600">
                    Last Updated: {formatDate(record.updated_at)}
                  </p>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => navigate(`/edit-pembeli/${record.id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record.id)}
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

export default Pembeli;
