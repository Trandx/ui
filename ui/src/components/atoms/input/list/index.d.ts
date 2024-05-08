import { PropsType, EmitsType } from "../index.d";

interface IEmitsList extends EmitsType {
  //(event: "change", elt: unknown ): void;
}

interface IPropsList<M>
  extends Omit<PropsType<M>, "autoclose" | "placeholder"> {}

declare interface IList<T> {
  props: IPropsList<T>;
  emits: IEmitsList;
}

export default IList;
