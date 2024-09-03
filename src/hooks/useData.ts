import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/apiService';

interface UseDataResult {
  data: any[];
  loading: boolean;
  error: string | null;
  addData: (newRecord: any) => Promise<void>;
  updateData: (id: string, updatedRecord: any) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
  refreshData: () => void;
}

export const useData = (): UseDataResult => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedData = await apiService.getData();
      setData(fetchedData);
    } catch (err) {
      setError('Failed to fetch data from the server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addData = async (newRecord: any) => {
    setLoading(true);
    try {
      const createdRecord = await apiService.createData(newRecord);
      setData((prevData) => [createdRecord, ...prevData]);
    } catch (err) {
      setError('Failed to add new data.');
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (id: string, updatedRecord: any) => {
    setLoading(true);
    try {
      const updatedData = await apiService.updateData(id, updatedRecord);
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? updatedData : item))
      );
    } catch (err) {
      setError('Failed to update data.');
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id: string) => {
    setLoading(true);
    try {
      await apiService.deleteData(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      setError('Failed to delete data.');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchData();
  };

  return {
    data,
    loading,
    error,
    addData,
    updateData,
    deleteData,
    refreshData,
  };
};
