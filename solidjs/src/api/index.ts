let API_HOST_URI = "http://localhost:5000";

enum HttpMethod {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  DELETE = "delete",
}

export type APIResponse<T> = {
  items?: T[];
  item: T;
  cursor?: string | null;
  error: any;
};

type Options = {
  body?: Object;
  headers?: Record<string, string>;
};

const fetchCall = <T>(
  method: HttpMethod,
  url: string,
  opts: Options = { body: {}, headers: {} },
): Promise<APIResponse<T>> => {
  if (!/^(http|https)\:\/\//.test(url)) {
    url = API_HOST_URI + url;
  }

  let headers: Record<string, string> = {};
  headers = Object.assign(opts.headers || {}, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  const config: RequestInit = {
    credentials: "include",
    method: method.toUpperCase(),
    headers,
    body: JSON.stringify(opts.body || {}),
  };
  if (method == HttpMethod.GET) {
    delete config["body"];
  }
  console.log("API URL :", url);
  console.log("Options :", config.body);
  return fetch(url, config)
    .then((resp) => {
      if (!resp.ok) {
        // throw resp;
        throw Error(resp.statusText);
      }
      return resp;
    })
    .then((resp) => (resp.status === 204 ? Promise.resolve() : resp.json()))
    .then((resp) => {
      console.log("debug =>", resp);
      return resp;
    });
};
