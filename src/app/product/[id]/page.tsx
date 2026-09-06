import React from 'react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1>Product Details ({params.id})</h1>
    </main>
  );
}
