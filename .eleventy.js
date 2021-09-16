const fs = require("fs");

// add browser prefixers and minify on a production build
processCSS = () => {
  if (process.env.ELEVENTY_ENV === "production") {
    const postcss = require("postcss");
    const autoprefixer = require("autoprefixer");
    const cssnano = require("cssnano");

    const cssFileInput = "./src/css/style.css";
    const cssFileOutput = "./public/css/style.css";

    const css = fs.readFileSync(cssFileInput);

    postcss([autoprefixer("last 10 versions", "ie 11"), cssnano])
      .process(css, { from: cssFileInput })
      .then((result) => {
        fs.writeFileSync(cssFileOutput, result.css);
      })
      .catch((err) => console.log);
  }
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/images");

  eleventyConfig.on("afterBuild", processCSS);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
