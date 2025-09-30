// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   staticPageGenerationTimeout: 1500, // ✅ must be top-level
//   images: {
//     domains: ['stackfood.6am.one'], // ✅ only image config here
//   },
// };

// module.exports = nextConfig;




// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   staticPageGenerationTimeout: 1500,
//   images: {
//     domains: ['stackfood.6am.one'],
//   },
//   async headers() {
//     return [
//       {
//         source: '/(.*)', // applies to all routes
//         headers: [
//           {
//             key: 'Permissions-Policy',
//             value: 'geolocation=(self), microphone=()', // remove unsupported features
//           },
//         ],
//       },
//     ];
//   },
// };

// module.exports = nextConfig;







/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 1500,
  images: {
    domains: ["stackfood.6am.one"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Permissions-Policy",
            value: "geolocation=(self), microphone=()", // remove ch-ua-form-factors
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;


