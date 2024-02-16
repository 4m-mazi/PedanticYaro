import { GatewayReadyDispatchData, WithIntrinsicProps } from "@discordjs/core";

export default async (_: WithIntrinsicProps<GatewayReadyDispatchData>) => {
  console.log("ready!");
};
