import { textToBlocks } from "@/lib/utils";

// Renders plain text from the admin panel. Blank lines create paragraphs
// and lines starting with "## " become headings.
export default function RichText({ text }) {
  return (
    <div className="space-y-5 text-base leading-relaxed text-slate-600">
      {textToBlocks(text).map((block, index) =>
        block.type === "heading" ? (
          <h2 key={index} className="pt-4 text-2xl font-bold tracking-tight text-navy-900">
            {block.text}
          </h2>
        ) : (
          <p key={index} className="whitespace-pre-line">
            {block.text}
          </p>
        )
      )}
    </div>
  );
}
