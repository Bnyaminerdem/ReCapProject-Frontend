import { ResponseList } from "./responseList";

export interface ListResponseModel<T> extends ResponseList{
data:T[];
}