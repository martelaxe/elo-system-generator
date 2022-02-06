import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/martelaxe/elo-system-generator" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title="Rank Table Generator"
        subTitle="Create ranking tables decentralized"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
