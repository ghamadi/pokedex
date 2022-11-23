import React from 'react';

// This is where pokemon details are displayed
// The list (in the layout) should become a list of links and each link points to /pokemon/name
// this page uses the query params to fetch the pokemon's details and renders a portal
export default function Page({ params }: { params: Record<string, string[]> }) {
  let { name } = params;

  if (!name) {
    return null;
  }

  return (
    <h1 style={{ color: 'red' }}>
      {name[0]}
    </h1>
  );
}
