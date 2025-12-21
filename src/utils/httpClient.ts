const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

type HttpMethod = typeof METHODS[keyof typeof METHODS];

interface HttpRequestOptions {
  headers?: Record<string, string>;
  method?: HttpMethod;
  data?: Record<string, any> | FormData;
  timeout?: number;
}

function queryStringify(data: Record<string, any>): string {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {
  get(url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  }

  post(url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  }

  put(url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  }

  delete(url: string, options: HttpRequestOptions = {}): Promise<XMLHttpRequest> { 
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  }

  request(url: string, options: HttpRequestOptions = {}, timeout: number = 5000): Promise<XMLHttpRequest> {
    const {headers = {}, method, data} = options;

    return new Promise(function(resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();

      xhr.open(
        method, 
        method === METHODS.GET ? `${url}${queryStringify(data as Record<string, any>)}` : url
      );

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as any);
      }
    });
  }
}

export default new HTTPTransport();