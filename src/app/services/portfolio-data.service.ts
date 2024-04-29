import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, mergeMap, switchMap } from 'rxjs';
import { parse, stringify } from 'yaml'

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {


  constructor(private http: HttpClient) {
  }

  public getData(): Observable<any> {
    // return this.http.get("/assets/data/portfolio-data.yaml", {
    //   observe: 'body',
    //   responseType: "text"   // This one here tells HttpClient to parse it as text, not as JSON
    // }).pipe(
    //   // Map Yaml to JavaScript Object
    //   map(yamlString => parse(yamlString))
    // );




    return this.http.get('/assets/configs/portfolio-data-source.yaml', {
      observe: 'body',
      responseType: "text" // This one here tells HttpClient to parse it as text, not as JSON
    })
    .pipe(
        map((sourceUrlYamlResponse: any) => {
          let url: any = parse(sourceUrlYamlResponse)
          console.log("URL: ", url);

          return url.portfolioDataSource;
        }),

        switchMap((url: string) => this.http.get(url, {
          observe: 'body',
          responseType: "text"   // This one here tells HttpClient to parse it as text, not as JSON
        }).pipe(
          // Map Yaml to JavaScript Object
          map(yamlString => parse(yamlString))
        )
        )
    );

  }

}
