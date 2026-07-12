interface WorkItem {
	year: string;
	title: string;
	tags: string[];
	desc: string;
	link: string;
	cta: string;
	icon?: string;
	internal?: boolean;
	accent?: 'blue' | 'clay';
	images?: string[];
}

interface Talk {
	event?: string;
	org?: string;
	edition?: string;
	location: string;
	topic: string;
	image?: string;
	video?: string;
	link?: string;
}

interface ExperienceRole {
	company: string;
	logo: string;
	role: string;
	location: string;
	period: string;
	current?: boolean;
	points: string[];
}

declare module '*/work.yml' {
	const work: WorkItem[];
	export default work;
}

declare module '*/speaking.yml' {
	const speaking: { conferences: Talk[]; community: Talk[] };
	export default speaking;
}

declare module '*/experience.yml' {
	const experience: ExperienceRole[];
	export default experience;
}
