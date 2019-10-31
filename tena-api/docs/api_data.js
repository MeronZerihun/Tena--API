define({ "api": [  {    "type": "get",    "url": "/adminAccount",    "title": "Get admin's account",    "name": "showAdminAccount",    "group": "Banks",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>Contains the admin's bank object.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\n    HTTP/1.1 200 OK\n{\n  \"data\": [\n      {\n          \"_id\": \"5db5d7b60ed99405ce9a9e1c\",\n          \"type\": \"Express\",\n          \"accountNumber\": \"8238968969\",\n          \"deposit\": 13030,\n          \"__v\": 0\n      }\n  ],\n  \"status\": 200\n  }",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Contains the error object sent for the request or description if object is not found.</p>"          },          {            "group": "Error 4xx",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "\nHTTP/1.1 404 Not Found\n\n    { \n    error: 'No such bank account found', \n    status: 404\n    }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/banks.js",    "groupTitle": "Banks"  },  {    "type": "get",    "url": "/notifications",    "title": "Get rates and offers by users",    "name": "getNotifications",    "group": "Notifications",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>Contains the offer and rates.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>Describes if the data is offer object or rate object.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "provider",            "description": "<p>Contains the provider associated with the request.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "request",            "description": "<p>Contains the request associated with the object represented in the data.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "user",            "description": "<p>Contains the user associated with the rate.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the request.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\n    HTTP/1.1 200 OK\n     \n[\n  {\n      \"data\": {\n          \"createdAt\": \"2019-10-27T18:28:27.834Z\",\n          \"_id\": \"5db5e1cfbe9615073fac89cc\",\n          \"accountNumber\": \"12387896456\",\n          \"paymentOption\": \"MasterCard\",\n          \"fundAmount\": 100,\n          \"providerId\": \"5db5d7b60ed99405ce9a9e1b\",\n          \"requestId\": \"5db5d7b50ed99405ce9a9e1a\",\n          \"__v\": 0\n      },\n      \"type\": \"offer\",\n      \"provider\": {\n          \"status\": \"Active\",\n          \"_id\": \"5db5d7b60ed99405ce9a9e1b\",\n          \"fullName\": \"Meron\",\n          \"email\": \"abc@gmail.com\",\n          \"phoneNo\": \"1234567\",\n          \"password\": \"$2b$10$GKzqj4CLS/XSD7AuhFl8bOEe6WhXCF6lP24QlwOdVdOj6ay216xvO\",\n          \"role\": \"provider\",\n          \"createdAt\": \"2019-10-27T17:45:26.450Z\",\n          \"modifiedAt\": \"2019-10-27T17:45:26.450Z\",\n          \"__v\": 0\n      },\n      \"request\": {\n          \"status\": \"pending\",\n          \"progress\": 600,\n          \"progressPercent\": 60,\n          \"rateAmount\": 0,\n          \"_id\": \"5db5d7b50ed99405ce9a9e1a\",\n          \"age\": 12,\n          \"gender\": \"F\",\n          \"maritalStatus\": \"married\",\n          \"diagnosis\": \"Cancer\",\n          \"description\": \"blablabla\",\n          \"photo\": \"2019-10-29T13:39:52.551Z-4-up on 10-29-18 at 7.09 PM.jpg\",\n          \"verificationFile\": \"2019-10-20T10:16:04.631Z-index.js\",\n          \"recoveryCost\": 1000,\n          \"patientId\": \"5db5d7b30ed99405ce9a9e19\",\n          \"requestedAt\": \"2019-10-27T17:45:25.400Z\",\n          \"__v\": 0\n      },\n      \"patient\": {\n          \"status\": \"Active\",\n          \"_id\": \"5db5d7b30ed99405ce9a9e19\",\n          \"fullName\": \"Melat\",\n          \"email\": \"abebe@gmail.com\",\n          \"phoneNo\": \"1234567\",\n          \"password\": \"$2b$10$WWX9pqvl6gDOeXRp4WnHb.ZILq8sWJ69snNJncWn7LZEuUWHaYD.e\",\n          \"role\": \"receiver\",\n          \"createdAt\": \"2019-10-27T17:45:23.953Z\",\n          \"modifiedAt\": \"2019-10-29T13:17:41.707Z\",\n          \"__v\": 0\n      },\n      \"status\": 200\n      }\n  ]",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Contains the error object sent for the request or description if object is not found.</p>"          },          {            "group": "Error 4xx",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "\nHTTP/1.1 404 Not Found\n\n    {\n        error: 'No offer and rates found', \n        status: 404\n     }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/notifications.js",    "groupTitle": "Notifications"  },  {    "type": "get",    "url": "/",    "title": "Get all offers",    "name": "GetAllOffers",    "group": "Offers",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Array",            "optional": false,            "field": "data",            "description": "<p>Contains all offer objects.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the request.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 Ok\n\n{\n    \"data\": [ \n        {\n            \"createdAt\": \"2019-10-30T09:19:12.459Z\",\n            \"_id\": \"5db9559425cd631569f09126\",\n            \"accountNumber\": \"12387896456\",\n            \"paymentOption\": \"MasterCard\",\n            \"fundAmount\": 200,\n            \"providerId\": \"5db5d7b60ed99405ce9a9e1b\",\n            \"requestId\": \"5db5d7b50ed99405ce9a9e1a\",\n            \"__v\": 0\n        }\n    ],\n    \"status\": 200\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Contains the error object sent for the request or description if object is not found.</p>"          },          {            "group": "Error 4xx",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "\n\nHTTP/1.1 404 Not Found\n\n  {\n      \"error\":  'No offers found',\n      \"status\": 404\n  }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/offers.js",    "groupTitle": "Offers"  },  {    "type": "get",    "url": "/:id",    "title": "Get offers by a provider",    "name": "GetOffersByProvider",    "group": "Offers",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>id of the provider of a fund</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>Contains the new offer object.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the request.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 Ok\n\n{\n    \"data\": {\n        \"createdAt\": \"2019-10-30T09:19:12.459Z\",\n        \"_id\": \"5db9559425cd631569f09126\",\n        \"accountNumber\": \"12387896456\",\n        \"paymentOption\": \"MasterCard\",\n        \"fundAmount\": 200,\n        \"providerId\": \"5db5d7b60ed99405ce9a9e1b\",\n        \"requestId\": \"5db5d7b50ed99405ce9a9e1a\",\n        \"__v\": 0\n    },\n    \"status\": 200\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Contains the error object sent for the request or description if object is not found.</p>"          },          {            "group": "Error 4xx",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "\nHTTP/1.1 400 Bad Request\n  {\n       \"error\": {\n           \"message\": \"Cast to ObjectId failed for value \\\"5db5d7b6ed99405ce9a9e1b\\\" at path \\\"_id\\\" for model \\\"User\\\"\",\n           \"name\": \"CastError\",\n           \"stringValue\": \"\\\"5db5d7b6ed99405ce9a9e1b\\\"\",\n           \"kind\": \"ObjectId\",\n           \"value\": \"5db5d7b6ed99405ce9a9e1b\",\n           \"path\": \"_id\"\n       },\n       \"status\": 400\n   }\n\nHTTP/1.1 404 Not Found\n\n  {\n      \"error\": \"No user found\",\n      \"status\": 404\n  }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/offers.js",    "groupTitle": "Offers"  },  {    "type": "get",    "url": "/patient/:id",    "title": "Get offers for a patient",    "name": "GetOffersToPatient",    "group": "Offers",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>id of the patient[receiver]</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>Contains a list of offers to patients.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "provider",            "description": "<p>Contains the user object of the provider.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the request.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 Ok\n\n[\n     {\n         \"data\": {\n             \"createdAt\": \"2019-10-27T18:23:54.466Z\",\n             \"_id\": \"5db5e0fed821f20711e03cf3\",\n             \"accountNumber\": \"12387896456\",\n             \"paymentOption\": \"MasterCard\",\n             \"fundAmount\": 100,\n             \"providerId\": \"5db5d7b60ed99405ce9a9e1b\",\n             \"requestId\": \"5db5d7b50ed99405ce9a9e1a\",\n             \"__v\": 0\n         },\n         \"provider\": {\n             \"status\": \"Active\",\n             \"_id\": \"5db5d7b60ed99405ce9a9e1b\",\n             \"fullName\": \"Meron\",\n             \"email\": \"abc@gmail.com\",\n             \"phoneNo\": \"1234567\",\n             \"password\": \"$2b$10$GKzqj4CLS/XSD7AuhFl8bOEe6WhXCF6lP24QlwOdVdOj6ay216xvO\",\n             \"role\": \"provider\",\n             \"createdAt\": \"2019-10-27T17:45:26.450Z\",\n             \"modifiedAt\": \"2019-10-27T17:45:26.450Z\",\n             \"__v\": 0\n         },\n         \"status\": 200\n     }\n ]",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Contains the error object sent for the request or description if object is not found.</p>"          },          {            "group": "Error 4xx",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "\nHTTP/1.1 400 Bad Request\n  {\n       \"error\": {\n           \"message\": \"Cast to ObjectId failed for value \\\"5db5d7b6ed99405ce9a9e1b\\\" at path \\\"_id\\\" for model \\\"User\\\"\",\n           \"name\": \"CastError\",\n           \"stringValue\": \"\\\"5db5d7b6ed99405ce9a9e1b\\\"\",\n           \"kind\": \"ObjectId\",\n           \"value\": \"5db5d7b6ed99405ce9a9e1b\",\n           \"path\": \"_id\"\n       },\n       \"status\": 400\n   }\n\nHTTP/1.1 404 Not Found\n\n  {\n      \"error\": \"No user found\",\n      \"status\": 404\n  }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/offers.js",    "groupTitle": "Offers"  },  {    "type": "post",    "url": "/fund",    "title": "Fund a request",    "name": "OfferFund",    "group": "Offers",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "type",            "description": "<p>of the bank</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "amount",            "description": "<p>amount of money to be funded</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "accountNo",            "description": "<p>phone number of the user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "requestId",            "description": "<p>id of the request to be funded</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "providerId",            "description": "<p>id of the provider of the fund</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>Contains the new offer object.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the request.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 201 Created\n\n{\n    \"data\": {\n        \"createdAt\": \"2019-10-30T09:19:12.459Z\",\n        \"_id\": \"5db9559425cd631569f09126\",\n        \"accountNumber\": \"12387896456\",\n        \"paymentOption\": \"MasterCard\",\n        \"fundAmount\": 200,\n        \"providerId\": \"5db5d7b60ed99405ce9a9e1b\",\n        \"requestId\": \"5db5d7b50ed99405ce9a9e1a\",\n        \"__v\": 0\n    },\n    \"status\": 201\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Contains the error object sent for the request or description if object is not found.</p>"          },          {            "group": "Error 4xx",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "\nHTTP/1.1 400 Bad Request\n  {\n       \"error\": {\n           \"message\": \"Cast to ObjectId failed for value \\\"5db5d7b6ed99405ce9a9e1b\\\" at path \\\"_id\\\" for model \\\"User\\\"\",\n           \"name\": \"CastError\",\n           \"stringValue\": \"\\\"5db5d7b6ed99405ce9a9e1b\\\"\",\n           \"kind\": \"ObjectId\",\n           \"value\": \"5db5d7b6ed99405ce9a9e1b\",\n           \"path\": \"_id\"\n       },\n       \"status\": 400\n   }\n\nHTTP/1.1 404 Not Found\n\n  {\n      \"error\": {\n          \"message\": \"Cast to ObjectId failed for value \\\"5db5d7b6ed99405ce9a9e1b\\\" at path \\\"_id\\\" for model \\\"User\\\"\",\n          \"name\": \"CastError\",\n          \"stringValue\": \"\\\"5db5d7b6ed99405ce9a9e1b\\\"\",\n          \"kind\": \"ObjectId\",\n          \"value\": \"5db5d7b6ed99405ce9a9e1b\",\n          \"path\": \"_id\"\n      },\n      \"status\": 400\n  }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/offers.js",    "groupTitle": "Offers"  },  {    "type": "put",    "url": "/block/:id",    "title": "Block user",    "name": "BlockUser",    "group": "Users",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "id",            "optional": false,            "field": "id",            "description": "<p>user's id</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "\nHTTP/1.1 204 No Content",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Contains the error object sent for the request.</p>"          },          {            "group": "Error 4xx",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "\nHTTP/1.1 404 Not Found\n{\n \"error\": {\n     \"message\": \"Cast to ObjectId failed for value \\\"{ _id: '5daf7d31e25f5e1ae808fa0' }\\\" at path \\\"_id\\\" for model \\\"User\\\"\",\n     \"name\": \"CastError\",\n     \"stringValue\": \"\\\"{ _id: '5daf7d31e25f5e1ae808fa0' }\\\"\",\n     \"kind\": \"ObjectId\",\n     \"value\": {\n \"_id\": \"5daf7d31e25f5e1ae808fa0\"\n     },\n     \"path\": \"_id\"\n },\n \"status\": 400\n }\n\n    HTTP/1.1 404 Not Found\n {\n \"error\": \"No user found\",\n \"status\": 404\n }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/users.js",    "groupTitle": "Users"  },  {    "type": "get",    "url": "?username=:name",    "title": "Request users information",    "name": "GetAllUsersOrByUsername",    "group": "Users",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>user's name [optional parameter]</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Array",            "optional": false,            "field": "data",            "description": "<p>Contains a list of user object.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "   HTTP/1.1 200 OK\n   {\n\"data\": [\n    {\n        \"status\": \"Active\",\n          \"_id\": \"5db5d7b30ed99405ce9a9e18\",\n        \"fullName\": \"admin\",\n        \"email\": \"tena-admin@gmail.com\",\n         \"phoneNo\": \"1234567\",\n        \"password\": \"$2b$10$MuZI4jYuwlxH9SKxWVBPWuE1JJ.nFSSV2CQ/5jLsfvNYwTvy0xB7.\",\n         \"role\": \"admin\",\n         \"createdAt\": \"2019-10-27T17:45:23.919Z\",\n         \"modifiedAt\": \"2019-10-27T17:45:23.919Z\",\n         \"__v\": 0\n     },\n     {\n         \"status\": \"Active\",\n         \"_id\": \"5db5d7b30ed99405ce9a9e19\",\n         \"fullName\": \"Melat\",\n         \"email\": \"abebe@gmail.com\",\n         \"phoneNo\": \"1234567\",\n         \"password\": \"$2b$10$WWX9pqvl6gDOeXRp4WnHb.ZILq8sWJ69snNJncWn7LZEuUWHaYD.e\",\n         \"role\": \"receiver\",\n         \"createdAt\": \"2019-10-27T17:45:23.953Z\",\n         \"modifiedAt\": \"2019-10-29T13:17:41.707Z\",\n         \"__v\": 0\n     } ],\n \"status\": 200\n    }",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Contains the error object sent for the request or description if object is not found.</p>"          },          {            "group": "Error 4xx",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 404 Not Found\n{\n     error: \"No users found\", \n     status: 404\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/users.js",    "groupTitle": "Users"  },  {    "type": "get",    "url": "/:role",    "title": "Get users by role [receiver or provider]",    "name": "GetUsersByRole",    "group": "Users",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "role",            "optional": false,            "field": "role",            "description": "<p>user's role [receiver or provider]</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Array",            "optional": false,            "field": "data",            "description": "<p>Contains a list of user object.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\n   HTTP/1.1 200 OK\n    {\n\"data\": [\n     {\n         \"status\": \"Active\",\n         \"_id\": \"5db5d7b30ed99405ce9a9e18\",\n         \"fullName\": \"admin\",\n         \"email\": \"tena-admin@gmail.com\",\n         \"phoneNo\": \"133258685834\",\n         \"password\": \"$2b$10$MuZI4jYuwlxH9SKxWVBPWuE1JJ.nFSSV2CQ/5jLsfvNYwTvy0xB7.\",\n         \"role\": \"admin\",\n         \"createdAt\": \"2019-10-27T17:45:23.919Z\",\n         \"modifiedAt\": \"2019-10-29T16:38:09.393Z\",\n         \"__v\": 0\n     },\n\"status\" : 200\n    }",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Contains the error object sent for the request or description if object is not found.</p>"          },          {            "group": "Error 4xx",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "\n   HTTP/1.1 404 Not Found\n{\n\"error\": \"No user found\",\n\"status\": 404\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/users.js",    "groupTitle": "Users"  },  {    "type": "post",    "url": "/login",    "title": "Login users",    "name": "LoginUser",    "group": "Users",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>email of the user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>password of the user</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>Contains the signed in user object.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\n   HTTP/1.1 200 OK\n    {\n\"data\": [\n     {\n         \"status\": \"Active\",\n         \"_id\": \"5db5d7b30ed99405ce9a9e18\",\n         \"fullName\": \"admin\",\n         \"email\": \"tena-admin@gmail.com\",\n         \"phoneNo\": \"133258685834\",\n         \"password\": \"$2b$10$MuZI4jYuwlxH9SKxWVBPWuE1JJ.nFSSV2CQ/5jLsfvNYwTvy0xB7.\",\n         \"role\": \"admin\",\n         \"createdAt\": \"2019-10-27T17:45:23.919Z\",\n         \"modifiedAt\": \"2019-10-29T16:38:09.393Z\",\n         \"__v\": 0\n     },\n\"status\" : 200\n    }",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Contains the error object sent for the request or message for invalid login.</p>"          },          {            "group": "Error 4xx",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "\nHTTP/1.1 400 Not Found\n{\n     error: \"Invalid email or password\", \n     status: 400\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/users.js",    "groupTitle": "Users"  },  {    "type": "post",    "url": "/signup",    "title": "Signup users",    "name": "SignUpUser",    "group": "Users",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "fullName",            "description": "<p>full name of the user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>email of the user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "phoneNo",            "description": "<p>phone number of the user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>password of the user</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "role",            "description": "<p>role of the user [provider, receiver, admin]</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "data",            "description": "<p>Contains the new user object.</p>"          },          {            "group": "Success 200",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "\n   HTTP/1.1 201 Created\n    {\n\"data\": [\n     {\n         \"status\": \"Active\",\n         \"_id\": \"5db5d7b30ed99405ce9a9e18\",\n         \"fullName\": \"admin\",\n         \"email\": \"tena-admin@gmail.com\",\n         \"phoneNo\": \"133258685834\",\n         \"password\": \"$2b$10$MuZI4jYuwlxH9SKxWVBPWuE1JJ.nFSSV2CQ/5jLsfvNYwTvy0xB7.\",\n         \"role\": \"admin\",\n         \"createdAt\": \"2019-10-27T17:45:23.919Z\",\n         \"modifiedAt\": \"2019-10-29T16:38:09.393Z\",\n         \"__v\": 0\n     },\n\"status\" : 201\n    }",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Contains the error object sent for the request.</p>"          },          {            "group": "Error 4xx",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response",          "content": "    HTTP/1.1 400 Bad Request\n    {\n \"error\": {\n     \"errors\": {\n         \"fullName\": {\n             \"message\": \"Path `fullName` is required.\",\n             \"name\": \"ValidatorError\",\n             \"properties\": {\n                 \"message\": \"Path `fullName` is required.\",\n                 \"type\": \"required\",\n                 \"path\": \"fullName\"\n             },\n             \"kind\": \"required\",\n             \"path\": \"fullName\"\n        },\n        \"email\": {\n             \"message\": \"Path `email` is required.\",\n             \"name\": \"ValidatorError\",\n             \"properties\": {\n                 \"message\": \"Path `email` is required.\",\n                 \"type\": \"required\",\n                 \"path\": \"email\"\n             },\n           \"kind\": \"required\",\n             \"path\": \"email\"\n         },\n         \"role\": {\n             \"message\": \"Path `role` is required.\",\n             \"name\": \"ValidatorError\",\n             \"properties\": {\n                 \"message\": \"Path `role` is required.\",\n                 \"type\": \"required\",\n                 \"path\": \"role\"\n             },\n             \"kind\": \"required\",\n             \"path\": \"role\"\n         }\n     },\n     \"_message\": \"User validation failed\",\n     \"message\": \"User validation failed: fullName: Path `fullName` is required., email: Path `email` is required., role: Path `role` is required.\",\n    \"name\": \"ValidationError\"\n },\n\"status\": 400\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/users.js",    "groupTitle": "Users"  },  {    "type": "put",    "url": "updateAccount/:id",    "title": "Update user",    "name": "UpdateUser",    "group": "Users",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "id",            "optional": false,            "field": "id",            "description": "<p>user's id</p>"          }        ]      }    },    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "\nHTTP/1.1 204 No Content",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "error",            "description": "<p>Contains the error object sent for the request.</p>"          },          {            "group": "Error 4xx",            "type": "Number",            "optional": false,            "field": "status",            "description": "<p>Contains the status of the response.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "\nHTTP/1.1 404 Not Found\n{\n \"error\": {\n     \"message\": \"Cast to ObjectId failed for value \\\"{ _id: '5daf7d31e25f5e1ae808fa0' }\\\" at path \\\"_id\\\" for model \\\"User\\\"\",\n     \"name\": \"CastError\",\n     \"stringValue\": \"\\\"{ _id: '5daf7d31e25f5e1ae808fa0' }\\\"\",\n     \"kind\": \"ObjectId\",\n     \"value\": {\n\n\n \"_id\": \"5daf7d31e25f5e1ae808fa0\"\n     },\n     \"path\": \"_id\"\n },\n \"status\": 400\n }\n\n    HTTP/1.1 404 Not Found\n {\n \"error\": \"No user found\",\n \"status\": 404\n }",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "routes/users.js",    "groupTitle": "Users"  }] });
