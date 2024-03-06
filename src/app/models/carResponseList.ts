import { Car } from "./car";
import { ResponseList } from "./responseList";

export interface CarResponseList extends ResponseList{
    data:Car[],
}