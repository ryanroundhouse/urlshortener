import { UrlDto } from './url.model';
import { Url, IUrl } from './url.schema';

export class UrlService {
  static async getAll(): Promise<UrlDto[]> {
    const urls: IUrl[] | void = await Url.find().catch(console.log);
    return (urls || []).map((url: IUrl) => ({
      code: url.code,
      url: url.url,
    }));
  }

  static async getUrl(code: string): Promise<UrlDto> {
    const url: IUrl | void = await Url.findOne({ code: code }).catch(
      console.log
    );
    if (url) {
      return {
        code: url?.code,
        url: url?.url,
      };
    }
    return null;
  }

  static async create(url: UrlDto): Promise<UrlDto> {
    const newUrl: IUrl | void = await Url.create(url).catch(console.log);
    if (newUrl) {
      return {
        code: newUrl?.code,
        url: newUrl?.url,
      };
    }
    return null;
  }

  isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

  static async delete(code: string): Promise<boolean> {
    const deletedUrl: IUrl | void = await Url.findOneAndDelete({
      code: code,
    }).catch(console.log);
    return !!deletedUrl;
  }
}
