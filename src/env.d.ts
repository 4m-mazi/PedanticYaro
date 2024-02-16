declare namespace NodeJS {
  interface ProcessEnv {
    readonly DISCORD_TOKEN: string | undefined;
    readonly DATABASE_URL: string | undefined;
  }
}
