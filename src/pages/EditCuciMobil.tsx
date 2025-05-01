import { useState, useEffect } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";

interface CuciMobil {
  id: number;
  nomor_polisi: string;
  cuci_kolong: boolean;
  cuci_body: boolean;
  cuci_full: boolean;
  created_at: string;
  updated_at: string;
}

const EditCuciMobil = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nomor_polisi: "",
    cuci_kolong: false,
    cuci_body: false,
    cuci_full: false
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await AxiosInstance.get(`/api/cuci-mobil/${id}`);
        const record: CuciMobil = response.data;
        setFormData({
          nomor_polisi: record.nomor_polisi,
          cuci_kolong: record.cuci_kolong,
          cuci_body: record.cuci_body,
          cuci_full: record.cuci_full
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch car wash record");
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AxiosInstance.patch(`/api/cuci-mobil/${id}`, formData);
      navigate("/cuci-mobil");
    } catch (err) {
      setError("Failed to update car wash record");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Car Wash Record</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            License Plate
          </label>
          <input
            type="text"
            name="nomor_polisi"
            value={formData.nomor_polisi}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            maxLength={15}
          />
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="cuci_full"
              checked={formData.cuci_full}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-gray-700 text-sm font-bold">
              Full Wash
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="cuci_body"
              checked={formData.cuci_body}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-gray-700 text-sm font-bold">
              Body Wash
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="cuci_kolong"
              checked={formData.cuci_kolong}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-gray-700 text-sm font-bold">
              Undercarriage Wash
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Record
          </button>
          <button
            type="button"
            onClick={() => navigate("/cuci-mobil")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCuciMobil;
