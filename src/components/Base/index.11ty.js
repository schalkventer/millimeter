module.exports = content => `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Millimeter</title>
      <meta name="description" content="A stupidly small node-based, serverless-CMS static site framework">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      ${content}
    </body>
  </html>
`