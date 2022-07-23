// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    name: "next-api-host-test",
    fetched: "Static Props",
    host: req.headers.host,
    date: new Date(),
    headers: req.headers,
  });
}
