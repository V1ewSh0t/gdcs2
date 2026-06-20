CMS.registerEditorComponent({
  id: "gif",
  label: "Gif",
  fields: [
    { name: "src", label: "GIF URL", widget: "string" },
    { name: "class", label: "Class", widget: "string", required: false },
  ],

  pattern: /{{<\s*gif\s+([^>]+)\s*>}}/s,

  fromBlock(match) {
    const attrs = match[1].trim();

    const srcAttrMatch = attrs.match(/src\s*=\s*"?([^\s"]+)"?/);
    const classAttrMatch = attrs.match(/class\s*=\s*"?([^\s"]+)"?/);

    const src = srcAttrMatch ? srcAttrMatch[1] : "";
    const className = classAttrMatch ? classAttrMatch[1] : "";

    return { src: src, class: className };
  },

  toBlock(data) {
    const src = data.src?.trim();
    const className = data.className?.toString().trim();

    if (className) {
      return `{{< gif src="${src}" class="${className}" >}}`;
    }
    return `{{< gif src="${src}" >}}`;
  },
});