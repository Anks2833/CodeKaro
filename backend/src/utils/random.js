import crypto from "crypto";

function random(size) {
  return crypto.randomBytes(size).toString("hex");
}

export default random;
