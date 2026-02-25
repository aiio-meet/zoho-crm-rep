import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

function toTitleCase(input: string) {
  return input
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function PlaceholderPage() {
  const { pageSlug = '' } = useParams();

  const pageTitle = useMemo(() => toTitleCase(pageSlug), [pageSlug]);

  return (
    <main className="flex-1 overflow-y-auto p-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-bold text-slate-800">{pageTitle}</h1>
        <p className="text-sm text-slate-500 mt-2">
          Diese Seite ist als Platzhalter angelegt. Du kannst hier als Nächstes dein eigenes Seiten-Component rendern.
        </p>
      </div>
    </main>
  );
}
