import { Flex, Text, Button } from "@radix-ui/themes";
import Link from "next/link";

export default function MyApp() {
	return (
		<section>
			<Flex className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
			<Text>Welcome to my Interactive Social Media Movie Database</Text>
			</Flex>
			<p>This is the start of something new and exciting</p>
		</section>
	);
}