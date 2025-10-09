/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3303976048")

  // update collection data
  unmarshal({
    "name": "contacts"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3303976048")

  // update collection data
  unmarshal({
    "name": "pb_contact"
  }, collection)

  return app.save(collection)
})
