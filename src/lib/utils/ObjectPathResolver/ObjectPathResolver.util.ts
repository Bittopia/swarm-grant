export class ObjectPathResolverUtil {
  static getObjectPathFromUrl(url: string): string[] | null {
    try {
      return new URL(url).pathname.replace('/new', '').split('/').slice(1)
    } catch (e) {
      return null
    }
  }
}
