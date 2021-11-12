module.exports = {
  client: {
    includes: ["./pages/**/*.{ts,tsx}", "./components/*.tsx"], // array of glob patterns
    service: {
      name: "myservice",
      url: process.env.HASURA_API_URL,
    },
  },
};
