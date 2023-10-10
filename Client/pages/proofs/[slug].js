import React from "react";
import { useRouter } from "next/router";

const hello = () => {
  const router = useRouter();
  const slug = router.query.slug;

  return (
    <div>The slug is {slug}</div>
  );
};

export default hello;
