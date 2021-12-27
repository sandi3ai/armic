import { useState, useEffect } from "react";

function useApi(url, params = {}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    }).then(async (res) => {
      setData(await res.json());
    });
  }, []);

  return { data, loading: !data };
}

export default useApi;
