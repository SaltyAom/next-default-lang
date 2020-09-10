const { useState } = require("react");

const { v4 } = require("uuid")

module.exports = {
  env: {
    languageId: `${v4()}-${v4()}`,
  },
}
