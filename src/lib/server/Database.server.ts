import { Client, type ClientConfig } from "pg";

export class Database {
  private static client: Client | null = null;

  public static async GetClient(): Promise<Client> {
    if (this.client == null) {
      let clientConfig: ClientConfig = {
        host: "localhost",
        user: "test",
        password: "1234",
        database: "test-db",
      };

      this.client = new Client(clientConfig);

      await this.client.connect();
    }

    return this.client;
  }
}
