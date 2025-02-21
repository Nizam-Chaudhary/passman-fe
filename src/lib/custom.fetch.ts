import { getToken } from "./auth";

const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return c.json();
  }

  if (contentType?.includes('application/pdf')) {
    return c.blob() as Promise<T>;
  }

  return c.text() as Promise<T>;
};

const getUrl = (contextUrl: string): string => {
  console.log('contextUrl', contextUrl);
  const url = new URL(contextUrl);
  console.log('url', url);
  const pathname = url.pathname;
  const search = url.search;
  const baseUrl = import.meta.env.VITE_BE_BASE_URL ?? 'http://localhost:3000';


  const requestUrl = new URL(`${baseUrl}${pathname}${search}`);

  return requestUrl.toString();
};

const getHeaders = (headers?: HeadersInit): HeadersInit => {
  const token = getToken();
  return {
    ...headers,
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const customFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = getHeaders(options.headers);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
  };

  const request = new Request(requestUrl, requestInit);
  const response = await fetch(request);
  const data = await getBody<T>(response);

  if (!response.ok) {
    console.error('Error Response: ', data);
    throw data;
  }

  return data as T;
  // return { status: response.status, data, headers: response.headers } as T;
};
