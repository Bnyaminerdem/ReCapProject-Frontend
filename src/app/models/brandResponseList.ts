import { Brand } from "./brand";
import { ResponseList } from "./responseList";

export interface BrandResponseList extends ResponseList{
    data:Brand[]
}