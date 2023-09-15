exports.generateHash = async function generateHash(string) {
    let hashHex;
  
    // Check if the environment supports the Web Crypto API (browser)
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(string);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Check if the environment is Node.js
    else if (typeof require === 'function') {
      const crypto = require('crypto');
      const hash = crypto.createHash('sha256');
      hash.update(string, 'utf-8');
      hashHex = hash.digest('hex');
    } else {
      throw new Error('Unsupported environment');
    }
  
    return hashHex;
  };
  