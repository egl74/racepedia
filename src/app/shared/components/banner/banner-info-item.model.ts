export class BannerInfoItem {
  position: string;
  name: string;
  country: string;
  result: string;

  public constructor(init?: Partial<BannerInfoItem>) {
    Object.assign(this, init);
  }
}
