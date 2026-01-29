"use client"; // add only if using hooks

import React from "react";

interface PageProps {
  params: { id: string };
}

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div>
      <h1>Edit Collection Page</h1>
      <p>Collection ID: {params.id}</p>
      {/* Add your form or content here */}
    </div>
  );
};

export default Page;
