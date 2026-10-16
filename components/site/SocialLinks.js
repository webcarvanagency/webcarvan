import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

const networks = [
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "twitter", label: "X (Twitter)", Icon: Twitter },
  { key: "youtube", label: "YouTube", Icon: Youtube },
  { key: "github", label: "GitHub", Icon: Github },
];

export default function SocialLinks({ social = {}, className = "" }) {
  const active = networks.filter((network) => social[network.key]);
  if (!active.length) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {active.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex size-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-brand-400 hover:bg-brand-600 hover:text-white"
          >
            <Icon className="size-4" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
