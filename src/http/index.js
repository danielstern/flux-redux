const asyncAwaitTime = 500;
export const get = (cb)=>{
    setTimeout(()=>{
        cb(true);
    },asyncAwaitTime);
}