import { KeyObject } from 'node:crypto';
declare const checkCekLength: (enc: string, cek: KeyObject | Uint8Array) => void;
export default checkCekLength;
