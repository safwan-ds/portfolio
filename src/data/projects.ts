/**
 * projects.ts — Project showcase entries.
 * Keys reference i18n keys in locale files under projects.items.<key>.
 * Edit this + the locale files to add/modify projects.
 */

export interface Project {
	key: string;
	tags: readonly string[];
	link?: string;
	github?: string;
}

const projects: readonly Project[] = [
	{
		key: "sign2speech",
		tags: ["arduino", "python", "signal_processing", "embedded"],
		github: "https://github.com/safwan-ds/sign2speech",
	},
	{
		key: "boost_converter_pwm",
		tags: ["arduino", "cpp", "power_electronics"],
		github: "https://github.com/safwan-ds/boost_converter_pwm",
	},
	{
		key: "astrododge",
		tags: ["godot", "gdscript", "game_design"],
		github: "https://github.com/safwan-ds/AstroDodge",
	},
	{
		key: "astrododge-pygame",
		tags: ["python", "pygame", "game_design"],
		github: "https://github.com/safwan-ds/AstroDodgePygame",
	},
	{
		key: "portfolio",
		tags: ["react", "threejs", "r3f", "tailwind_css", "i18n"],
		github: "https://github.com/safwan-ds/portfolio",
	},
];

export default projects;
