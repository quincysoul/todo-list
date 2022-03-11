import axios, { AxiosResponse, CancelToken } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import TodoObj from '../../types/Task';
import tasksSuccess from '../tasksSuccessMock';

const useGetTodosv1 = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);

  const fetchData = useCallback((async (token: CancelToken) => {
    setLoading(true);

    try {
      const parrotDevTools = false;
      let res: Partial<AxiosResponse> = {};
      if (parrotDevTools) {
        const uri = 'http://localhost:3050/todos';
        res = await axios.get(uri);
        setData(res.data);
      }
      else {
        setData(JSON.parse(tasksSuccess));
      }
      setError(null);
    }
    catch (err) {
      console.error(err);
      setError(`${err}`);
    }
    finally {
      setLoading(false);
    }
  }), []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const { token } = source;
    fetchData(token);
  }, [fetchData]);

  return {
    data, setData, error, loading,
  };
};

export default useGetTodosv1;
