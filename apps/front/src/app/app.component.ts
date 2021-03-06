import { Component, OnInit } from '@angular/core';
import { Url } from '@urlshortener/shortlib';
import { UrlService } from './url.service';

@Component({
  selector: 'urlshortener-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'front';
  urls: Url[] = [];

  newUrl: Url = {
    code: '',
    url: '',
  };

  constructor(private urlService: UrlService) {}

  ngOnInit(): void {
    this.urlService.getAll().subscribe((urls: Url[]) => {
      this.urls = urls;
    });
  }

  createUrl() {
    if (!this.newUrl.code || !this.newUrl.url) {
      alert('Both a code and a url are required.');
      return;
    }
    if (!this.isValidHttpOrHttpsUrl(this.newUrl.url)) {
      alert('Not a valid url (start with http or https)');
      return;
    }
    this.urlService.create(this.newUrl).subscribe((url: Url) => {
      this.urls.push(url);
      this.newUrl = {
        code: '',
        url: '',
      };
    });
  }

  isValidHttpOrHttpsUrl(urlString: string): boolean {
    let url;

    try {
      url = new URL(urlString);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  deleteUrl(code?: string) {
    if (!code) {
      return;
    }
    if (window.confirm('Are you sure? This action cannot be undone...')) {
      this.urlService.delete(code).subscribe((success: boolean) => {
        if (success) {
          this.urls = this.urls.filter((url: Url) => url.code !== code);
        } else {
          alert("Couldn't delete url.");
        }
      });
    }
  }
}
