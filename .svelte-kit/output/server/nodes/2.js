

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.DiqB4Osg.js","_app/immutable/chunks/DXDyIBdz.js","_app/immutable/chunks/B0Ml5HMa.js"];
export const stylesheets = ["_app/immutable/assets/2.Bx-nQ2YM.css"];
export const fonts = [];
