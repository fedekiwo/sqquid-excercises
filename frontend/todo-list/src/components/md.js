import React from "react";
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

export default function MarkDown(props) {
  const { description } = props
  const markDown = md.render(description || "");
  return(
    <div
      style={{ border: "1px solid #767676", padding: "0 20px" }}
      dangerouslySetInnerHTML={{__html:markDown}}
    />
  );
}