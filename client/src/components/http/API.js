import {$host} from "./index";

export const showAllCars = async () => {
  return await $host.get("api/car", {headers: { 'Access-Control-Allow-Origin': true }});
}