/**
 * socials.ts — Social media links shown in Contact section.
 * URLs are derived from profile.ts to keep them in sync.
 */

import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import profile from "./profile";

export interface SocialLink {
	label: string;
	href: string;
	icon: IconType;
	hoverColor: string;
}

const socials: readonly SocialLink[] = [
	{
		label: "GitHub",
		href: `https://github.com/${profile.github}`,
		icon: FaGithub,
		hoverColor: "hover:text-white",
	},
	{
		label: "LinkedIn",
		href: `https://linkedin.com/in/${profile.linkedin}`,
		icon: FaLinkedin,
		hoverColor: "hover:text-[#0A66C2]",
	},
];

export default socials;
