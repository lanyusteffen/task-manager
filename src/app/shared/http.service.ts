import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import { LocalStorage, SessionStorage } from 'ngx-webstorage';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import * as settings from "../../assets/appsettings.json";

@Injectable()
export class HttpUtilityService {

    @SessionStorage()
    accessToken: string;
    @SessionStorage()
    refreshToken: string;
    @LocalStorage()
    accessPersistenceToken: string;
    @LocalStorage()
    refreshPersistenceToken: string;

    constructor(private http: Http, private router: Router) { }

    private addJsonRequestHeader(withRefreshToken: boolean): RequestOptions {
        const headers = new Headers({'Content-Type': 'application/json',
        'Accept': '*/*'});

        if (withRefreshToken) {
            headers.append('RefreshToken', this.refreshToken ? this.accessToken
                : this.accessPersistenceToken);
        } else {
            headers.append('Approve', this.accessToken ? this.accessToken
                : this.accessPersistenceToken);
        }

        const options = new RequestOptions({headers: headers });
        return options;
    }

    private getAbsoluteUrl(url: string): string {
        if (url.startsWith('http')) {
            return url;
        }
        return (<any>settings).BaseApiUrl + url;
    }

    public safePost(url: string, postData: any,
        next: (value: any) => void, occurError: (err: any) => void,
            withRefreshToken = false): void {
            const options = this.addJsonRequestHeader(withRefreshToken);
            this.http.post(this.getAbsoluteUrl(url), postData, options)
                .map(r => r.json())
                .subscribe(next, err => {
                    if (err instanceof Response) {
                        const resp = err as Response;
                        if (resp.status === 401) {
                            if (!withRefreshToken) {
                                this.safePost(url, postData, next, occurError, true);
                            } else {
                                alert('请先登录');
                                this.router.navigate(['authorize']);
                            }
                        } else if (resp.status === 429) {
                            alert(resp.statusText);
                        } else {
                            occurError(err);
                        }
                   } else {
                       occurError(err);
                   }
                });
    }

    public postObservable(url: string, postData: any,
        withRefreshToken = false): Observable<any> {
        const options = this.addJsonRequestHeader(withRefreshToken);
        return this.http.post(this.getAbsoluteUrl(url), postData, options)
            .map(r => r.json())
            .catch((err: any) => {
                if (err instanceof Response) {
                    const resp = err as Response;
                    if (resp.status === 401) {
                        if (!withRefreshToken) {
                            this.postObservable(url, postData, true);
                        } else {
                            alert('请先登录');
                            this.router.navigate(['authorize']);
                        }
                    } else if (resp.status === 429) {
                        alert(resp.statusText);
                    } else {
                        return Observable.throw(err.json().error || 'Server error');
                    }
               } else {
                    return Observable.throw(err.json().error || 'Server error');
               }
            });
    }

    public post(url: string, postData: any,
        next: (value: any) => void, withRefreshToken = false): void {
       return this.safePost(url, postData, next, (err) => console.log(err),
        withRefreshToken);
    }

    public safeGet(url: string, next: (value: any) => void,
        occurError: (err: any) => void, withRefreshToken = false): void {
            const options = this.addJsonRequestHeader(withRefreshToken);
            this.http.get(this.getAbsoluteUrl(url), options)
                .map(r => r.json())
                .subscribe(next, err => {
                    if (err instanceof Response) {
                        const resp = err as Response;
                        if (resp.status === 401) {
                            if (!withRefreshToken) {
                                this.safeGet(url, next, occurError, true);
                            } else {
                                alert('请先登录');
                                this.router.navigate(['authorize']);
                            }
                        } else if (resp.status === 429) {
                            alert(resp.statusText);
                        } else {
                            occurError(err);
                        }
                   } else {
                      occurError(err);
                   }
                });
    }

    public get(url: string, next: (value: any) => void,
        withRefreshToken = false): void {
        this.safeGet(url, next, (err) => console.log(err), withRefreshToken);
    }

    public getObservable(url: string, withRefreshToken = false): Observable<any> {
        const options = this.addJsonRequestHeader(withRefreshToken);
        return this.http.get(this.getAbsoluteUrl(url), options)
            .map(r => r.json())
            .catch((err: any) => {
                if (err instanceof Response) {
                    const resp = err as Response;
                    if (resp.status === 401) {
                        if (!withRefreshToken) {
                            this.getObservable(url, true);
                        } else {
                            alert('请先登录');
                            this.router.navigate(['authorize']);
                        }
                    } else if (resp.status === 429) {
                        alert(resp.statusText);
                    } else {
                        return Observable.throw(err.json().error || 'Server error');
                    }
               } else {
                    return Observable.throw(err.json().error || 'Server error');
               }
            });
    }
}
