import { textToBlocks } from "@/lib/utils";

function inlineLinks(text) {
  return text.split(/(\[[^\]]+\]\((?:https?:\/\/|\/(?!\/))[^\s)]+\))/g).map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(((?:https?:\/\/|\/(?!\/))[^\s)]+)\)$/);
    return match ? <a key={index} href={match[2]} className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 hover:text-brand-900">{match[1]}</a> : part;
  });
}

// Renders plain text from the admin panel. Blank lines create paragraphs
// and lines starting with "## " become headings.
export default function RichText({ text }) {
  return (
    <div className="space-y-5 text-base leading-relaxed text-slate-600">
      {textToBlocks(text).map((block, index) =>
        block.type === "heading" ? (
          <h2 key={index} className="pt-4 text-2xl font-bold tracking-tight text-navy-900">
            {inlineLinks(block.text)}
          </h2>
        ) : (
          <p key={index} className="whitespace-pre-line">
            {inlineLinks(block.text)}
          </p>
        )
      )}
    </div>
  );
}
