function useLazyApi(url) {
  async function makeApiCall(params) {
    return await (
      await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })
    ).json();
  }
  return makeApiCall;
}

export default useLazyApi;
