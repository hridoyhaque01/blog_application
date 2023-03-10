import React from "react";
import Filter from "../components/filter/Filter";
import BlogLists from "../components/grid/BlogLists";

export default function Home() {
  return (
    <>
      <section className="wrapper">
        <Filter />
        <BlogLists />
      </section>
    </>
  );
}
