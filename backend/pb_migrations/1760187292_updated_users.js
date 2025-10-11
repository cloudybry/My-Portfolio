/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "createRule": "id = @request.auth.id || @request.auth.role = \"admin\"",
    "deleteRule": "id = @request.auth.id || @request.auth.role = \"admin\"",
    "listRule": "id = @request.auth.id || @request.auth.role = \"admin\"",
    "oauth2": {
      "mappedFields": {
        "name": ""
      }
    },
    "updateRule": "id = @request.auth.id || @request.auth.role = \"admin\"",
    "viewRule": "id = @request.auth.id || @request.auth.role = \"admin\""
  }, collection)

  // add field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2282622326",
    "max": 0,
    "min": 0,
    "name": "admin",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1579384326",
    "max": 255,
    "min": 0,
    "name": "role",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "id = @request.auth.id",
    "listRule": "id = @request.auth.id",
    "oauth2": {
      "mappedFields": {
        "name": "name"
      }
    },
    "updateRule": "id = @request.auth.id",
    "viewRule": "id = @request.auth.id"
  }, collection)

  // remove field
  collection.fields.removeById("text2282622326")

  // update field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1579384326",
    "max": 255,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
