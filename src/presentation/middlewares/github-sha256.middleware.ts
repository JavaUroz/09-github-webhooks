

export class GithubSha256Middleware {
  private static encoder = new TextEncoder();

  private static async verifySignature (secret: string, header: string, payload: string) {
      let parts = header.split('=');
      let sigHex = parts[1];

      let algorithm = { name: "HMAC", hash: { name: 'SHA-256' } };

      let keyBytes = this.encoder.encode(secret);
      let extractable = false
      let key = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        algorithm,
        extractable,
        ["sign", "verify"],
      );

      let sigBytes = this.hexToBytes(sigHex);
      let dataBytes = this.encoder.encode(payload);
      let equal = await crypto.subtle.verify(
        algorithm.name,
        key,
        sigBytes,
        dataBytes,
      );

    return equal;
  }

  private static hexToBytes(signature: string = ''){
    let len = signature.length / 2;
    let bytes = new Uint8Array(len);

    let index = 0;
    for (let i = 0; i < signature.length; i += 2) {
        let c = signature.slice(i , i + 2);
        let b = parseInt(c, 16);
        bytes[index] = b;
        index += 1;
    }

    return bytes
  }
}