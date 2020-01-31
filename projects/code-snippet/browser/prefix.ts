interface IPrefix {
  dom: string;
  lowercase: string;
  css: string;
  js: string;
}

// @see https://davidwalsh.name/vendor-prefix
export const prefix = (() => {
  const styles = window.getComputedStyle(window.document.documentElement);
  const pre = (Array.from(styles).join('').match(/-(moz|webkit|ms)-/) || ((styles as any).OLink === '' && ['', 'o']))[1];
  const dom = ('Webkit|Moz|MS|O').match(new RegExp(`(${pre})`, 'i'))[1];
  return {
    dom,
    lowercase: pre,
    css: `-${pre}-`,
    js: pre[0].toUpperCase() + pre.substr(1)
  };
})() as IPrefix;
