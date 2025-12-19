import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";

import { AnalyticsProvider } from "@alienthebetrayer/analytics-sdk-react";
import { GlobalRouter } from "./router";
import { LocalStoreWatcher } from "./zustand/LocalStoreWatcher";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AnalyticsProvider config={{ endpoint: "bento" }}>
			<LocalStoreWatcher />
			<RouterProvider router={GlobalRouter} />
		</AnalyticsProvider>
	</StrictMode>,
);
