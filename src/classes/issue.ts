export default class Issue {
  public title: string;
  public body: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(
    title: string,
    body: string,
    createdAt: string,
    updatedAt: string
  ) {
    this.title = title;
    this.body = body;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
