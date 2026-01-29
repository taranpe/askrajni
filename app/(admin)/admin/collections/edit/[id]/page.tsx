"use client"; // if using client-side React hooks

import React from "react";

interface PageProps {
  params: { id: string };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <h1>Edit Collection {params.id}</h1>
      {/* your edit form */}
    </div>
  );
};

export default Page;
