import React from 'react';

export default function HeritagePassportPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1>Heritage Passport ({params.id})</h1>
    </main>
  );
}
