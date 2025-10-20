


import { ServerApp } from "."; // make sure index.ts exports your express app


const port = process.env.PORT || 5000;
let server:any;

(async () => {
  try {
    server = ServerApp.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
})();


process.on("SIGINT", () => {
  if (server) {
    server.close(() => {
      console.log("🛑 Server closed gracefully.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
