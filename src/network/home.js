import {request} from "./request";

export  function getHomeSwiftImg() {

  return request({
    url:'/home/multidata'
  })

}
export  function getHeat() {

  return request({
    url:'/pandora/heat/getAllHeats'
  })
}
