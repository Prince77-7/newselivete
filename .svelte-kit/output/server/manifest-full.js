export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["data/.gitkeep","favicon.png","fonts/PP Hatton Bold 700.woff2","fonts/PP Hatton Medium 500.woff2","fonts/PP Hatton Ultralight 200.woff2","fonts/PPAir-BlackMono-BF64a4d4815de9f.woff2","fonts/PPAir-BlackMonoItalic-BF64a4d480c61c3.woff2","fonts/PPAir-ExtraLightMono-BF64a4d481368bc.woff2","fonts/PPAir-Medium-BF64a4d48178864.woff2","fonts/PPAir-MediumItalic-BF64a4d48187f4f.woff2","fonts/PPAir-MediumMono-BF64a4d4810f069.woff2","fonts/PPAir-MediumMonoItalic-BF64a4d480e3406.woff2","fonts/PPAir-SemiBold-BF64a4d48192c6e.woff2","fonts/PPAir-SemiBoldMono-BF64a4d480f20b2.woff2","images/wasaw.svg","images/wasaw_black.svg","images/wasaw_icon_black.svg","images/wasaw_icon_red.svg","images/wasaw_icon_white.svg","images/wasaw_noicon.svg","images/wasaw_red.svg","images/wasaw_white.svg"]),
	mimeTypes: {".png":"image/png",".woff2":"font/woff2",".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.DVoJcfQ6.js",app:"_app/immutable/entry/app.kzf9PIri.js",imports:["_app/immutable/entry/start.DVoJcfQ6.js","_app/immutable/chunks/DIKzmwrg.js","_app/immutable/chunks/DXDyIBdz.js","_app/immutable/entry/app.kzf9PIri.js","_app/immutable/chunks/DXDyIBdz.js","_app/immutable/chunks/B0Ml5HMa.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/blog/[id]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/properties",
				pattern: /^\/properties\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/properties/[id]",
				pattern: /^\/properties\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
