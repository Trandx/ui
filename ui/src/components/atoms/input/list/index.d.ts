import { PropsType, EmitsType } from "../index.d";

interface IEmitsList extends EmitsType {
  //(event: "change", elt: unknown ): void;
}

interface IPropsList
  extends Omit<PropsType, "autoclose" | "placeholder"> {}

declare namespace IList {
  export type props = IPropsList;
  export type emits = IEmitsList;
}

export default IList;
