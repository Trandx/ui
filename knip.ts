const compiler = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;

export default {
  compilers: {
    vue: (text: any) => {
      const scripts = [];
      let match: RegExpExecArray | null;
      while ((match = compiler.exec(text))) match ?? scripts.push(match[1]);
      return scripts.join(";");
    },
  },
};
