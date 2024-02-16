import { GatewayDispatchEvents, WithIntrinsicProps } from "@discordjs/core";

import ready from "./ready.js";

const handlers: {
  // biome-ignore lint/suspicious/noExplicitAny: skill issue
  [key in GatewayDispatchEvents]?: (a: WithIntrinsicProps<any>) => unknown;
} = {
  [GatewayDispatchEvents.Ready]: ready,
};

export default handlers;
