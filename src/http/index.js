import { generate as id } from 'shortid';
const asyncAwaitTime = 500;
export const get = (url, cb)=>{
    setTimeout(()=>{
        cb(id());
    },asyncAwaitTime);
}