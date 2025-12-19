import { useLoadingContext } from "../../loading/context/LoadingContext";
import "./Header.css";

import { useAnalytics } from "@alienthebetrayer/analytics-sdk-react";
import { motion } from "motion/react";
import { useLocalStore } from "../../../zustand/localStore";
import { LinkButton } from "../../ui/LinkButton/components/LinkButton";
import { ToggleButton } from "../../ui/ToggleButton/components/ToggleButton";

import homeImg from "../assets/home.svg";
import pricingImg from "../assets/pricing.svg";
import { useHeaderAnimation } from "../hooks/useHeaderAnimation";

export const headerSize = 300;

export const Header = () => {
	const [loadingState] = useLoadingContext();
	const { theme, toggleTheme } = useLocalStore();

	useHeaderAnimation();

	// analytics
	const analytics = useAnalytics();

	return (
		<motion.header
			whileHover={
				loadingState.hasHeaderFinished
					? { maxWidth: `${headerSize + 24}px` }
					: {}
			}
		>
			<nav>
				<LinkButton to="/home">
					<img
						src={homeImg}
						alt="home"
						className="img"
						style={{ opacity: 0.5 }}
					/>
					Home
				</LinkButton>
				<LinkButton to="/pricing">
					<img
						src={pricingImg}
						alt="pricing"
						className="img"
						style={{ opacity: 0.5 }}
					/>
					Pricing
				</LinkButton>
				<ToggleButton
					value={theme !== "dark"}
					onChange={() => {
						if (theme === "dark") {
							analytics.current.send("theme_toggle");
						}

						toggleTheme();
					}}
					style={{ marginLeft: "auto" }}
				/>
			</nav>
		</motion.header>
	);
};
