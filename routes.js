import authRoutes from "./features/auth/auth.routes.js";
import courseRoutes from "./features/courses/course.routes.js";
import instructorRoutes from "./features/instructors/instructor.routes.js";
import contentRoutes from "./features/content/content.routes.js";
import settingsRoutes from "./features/settings/settings.routes.js";
import statsRoutes from "./features/statistics/statistics.routes.js";
import transactionRoutes from "./features/transactions/transaction.routes.js";

export default (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/instructors", instructorRoutes);
  app.use("/api/content", contentRoutes);
  app.use("/api/settings", settingsRoutes);
  app.use("/api/stats", statsRoutes);
  app.use("/api/transactions", transactionRoutes);
};
