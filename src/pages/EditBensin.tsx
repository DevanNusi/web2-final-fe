import { useState, useEffect } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";

interface Bensin {
  id: number;
  jenis_bensin: string;
  harga_per_liter: number;
  created_at: string;
  updated_at: string;
}

const EditBensin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    jenis_bensin: "",
    harga_per_liter: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBensin = async () => {
      try {
        const response = await AxiosInstance.get(`/api/bensin/${id}`);
        const bensin: Bensin = response.data;
        setFormData({
          jenis_bensin: bensin.jenis_bensin,
          harga_per_liter: bensin.harga_per_liter.toString()
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bensin data");
        setLoading(false);
      }
    };

    fetchBensin();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AxiosInstance.patch(`/api/bensin/${id}`, {
        jenis_bensin: formData.jenis_bensin,
        harga_per_liter: Number(formData.harga_per_liter)
      });
      navigate("/bensin");
    } catch (err) {
      setError("Failed to update bensin");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Bensin</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fuel Type
          </label>
          <input
            type="text"
            name="jenis_bensin"
            value={formData.jenis_bensin}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            placeholder="e.g., Pertalite, Pertamax, etc."
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price per Liter (Rp)
          </label>
          <input
            type="number"
            name="harga_per_liter"
            value={formData.harga_per_liter}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            min="0"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Bensin
          </button>
          <button
            type="button"
            onClick={() => navigate("/bensin")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBensin;
