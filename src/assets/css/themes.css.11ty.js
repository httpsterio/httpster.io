module.exports = class {
  data() {
    return {
      permalink: "/assets/css/themes.css",
      eleventyExcludeFromCollections: true,
    };
  }

  render({ collections }) {
    const seen = new Set();
    const themeValues = [];

    for (const post of collections.posts) {
      const theme = post.data.theme;
      if (Array.isArray(theme)) {
        const key = theme.join("-");
        if (!seen.has(key)) {
          seen.add(key);
          themeValues.push(theme);
        }
      }
    }

    return themeValues.map(theme => {
      return `
.theme-${theme[0]} {
  border-color: var(--color-${theme[0]});
  color: var(--color-${theme[1]});
  background-color: var(--color-${theme[0]});
}

.theme-${theme[0]}:hover,
.theme-${theme[0]}:focus-within {
  border-color: var(--color-${theme[1]});
  box-shadow: 0.75rem -0.75rem 0 0 var(--color-dark), -0.75rem 0.75rem 0 0 var(--color-${theme[0]});
}

.theme-${theme[0]}::selection {
  color: var(--color-${theme[0]});
  background-color: var(--color-${theme[1]});
}

.theme-${theme[0]}-post-tag {
  color: var(--color-${theme[0]});
  background: var(--color-${theme[1]});
}
      `.trim();
    }).join("\n\n");
  }
};