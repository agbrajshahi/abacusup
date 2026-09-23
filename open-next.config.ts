import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Uncomment to enable R2 cache for improved performance:
  // incrementalCache: r2IncrementalCache,
});