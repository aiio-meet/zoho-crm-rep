import React from 'react';
import { useParams } from 'react-router-dom';

const PlaceholderPage: React.FC = () => {
  const { pageSlug } = useParams<{ pageSlug: string }>();
  const pageTitle = pageSlug ? pageSlug.charAt(0).toUpperCase() + pageSlug.slice(1) : 'Seite';

  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-white p-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-800">{pageTitle}</h1>
        <p className="text-slate-600 max-w-md mx-auto">
          Diese Seite ist als Platzhalter angelegt. Du kannst hier als Nächstes dein eigenes Seiten-Component rendern.
        </p>
      </div>
    </main>
  );
};

export default PlaceholderPage;
