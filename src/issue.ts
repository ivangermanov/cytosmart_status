export default class Issue {
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;

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
