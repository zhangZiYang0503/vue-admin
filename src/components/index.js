const modulesFiles = require.context("@/components", true, /\.vue$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './Paging.vue' => 'i-paging'
  if (/\.(\/[\w-]+){3,}\.vue/.test(modulePath)) return modules;
  const value = modulesFiles(modulePath);
  modules[value.default.name] = value.default;
  return modules;
}, {});

export default modules;
