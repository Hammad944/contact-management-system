import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  base_url = 'https://677420d277a26d4701c74b11.mockapi.io/api'; // this will be moved to environments folder later
  constructor(private http: HttpClient) { }
  /**
   * Sends a GET request to the specified path with optional query parameters.
   * 
   * @param path - The endpoint URL to send the GET request to.
   * @param options - An optional object containing key-value pairs to be converted into query parameters.
   * @returns An Observable of type T, which will emit the response data.
   */
  get<T>(path: string, options: { [param: string]: unknown } = {}): Observable<T> {
    const httpParamOptions = {
      params: this.createOptionsToHttpParams(options)
    };
    return this.http.get<T>(`https://677420d277a26d4701c74b10.mockapi.io/api/contacts`, httpParamOptions);
  }
  /**
   * Converts an object of key-value pairs into HttpParams for use in HTTP requests.
   * 
   * @param options - An object containing key-value pairs to be converted into HttpParams.
   * @returns A new HttpParams object containing the provided key-value pairs as query parameters.
   */
  private createOptionsToHttpParams(options: { [param: string]: unknown } = {}) {
    let httpParams = new HttpParams();
    for (const key in options) {
      if (options.hasOwnProperty(key) && options[key]) {
        const value = options[key];
        if (Array.isArray(value)) {
          value?.forEach((val) => {
            if (val) httpParams = httpParams.append(`${key}[]`, val as string)
          })
        } else {
          httpParams = httpParams.set(key, options[key] as string);
        }
      }
    }
    return httpParams;
  }
}
