import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.YbtAufVI.js","_app/immutable/chunks/DXDyIBdz.js","_app/immutable/chunks/B0Ml5HMa.js","_app/immutable/chunks/D6YF6ztN.js","_app/immutable/chunks/BuqzGUd0.js","_app/immutable/chunks/rWxgIF7B.js"];
export const stylesheets = ["_app/immutable/assets/0.CXjXaKaJ.css"];
export const fonts = [];
