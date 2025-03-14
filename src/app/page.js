import Image from "next/image";
import "@radix-ui/themes/styles.css";
import MyApp from "./components/Radix";


import { Theme } from "@radix-ui/themes";


export default function () {
	return (
				<Theme accentColor="violet">
					<MyApp />
				</Theme>
	);
}