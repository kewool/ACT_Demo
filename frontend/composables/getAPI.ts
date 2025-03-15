export const getAPI = async <T>(path: string, option = {}) => {
  const config = useRuntimeConfig();

  return await useFetch<T>(path, {
    ...option,
    baseURL: config.public.BaseUrl,
    credentials: "include",
    headers: {
      accept: "application/json;v=1",
    },
  });
};