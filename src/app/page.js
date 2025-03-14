import "@radix-ui/themes/styles.css";
import MyApp from "./components/Radix";
import { Theme } from "@radix-ui/themes";


export default function Home() {
	return (
				<Theme >
					<MyApp />
				</Theme>
	);
}