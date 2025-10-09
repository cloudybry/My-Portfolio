/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3303976048")

  // update collection data
  unmarshal({
    "createRule": "@request.method = \"POST\" && \n@request.body.name != \"\" && \n@request.body.email != \"\" && \n@request.body.message != \"\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3303976048")

  // update collection data
  unmarshal({
    "createRule": "@request.body.name != \"\" && @request.body.email != \"\" && @request.body.message != \"\""
  }, collection)

  return app.save(collection)
})
