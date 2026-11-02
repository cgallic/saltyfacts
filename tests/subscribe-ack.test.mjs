import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../api/subscribe.js',import.meta.url),'utf8');
const {default:handler}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
async function call(provider){
 const prior=global.fetch, priorKey=process.env.LOOPS_API_KEY;process.env.LOOPS_API_KEY='test-key-only';
 global.fetch=async()=>provider;
 const res={headers:{},setHeader(k,v){this.headers[k]=v},status(code){this.code=code;return this},json(data){this.data=data;return this},end(){return this}};
 try{await handler({method:'POST',body:{email:'qa@example.invalid'}},res);return res}finally{global.fetch=prior;if(priorKey===undefined)delete process.env.LOOPS_API_KEY;else process.env.LOOPS_API_KEY=priorKey}
}
test('provider acknowledgement produces success',async()=>{const r=await call({ok:true,json:async()=>({success:true})});assert.equal(r.code,200);assert.equal(r.data.success,true)});
for(const [label,provider] of [['HTTP rejection',{ok:false,json:async()=>({message:'rejected'})}],['HTTP failure even with success body',{ok:false,json:async()=>({success:true})}],['explicit application rejection',{ok:true,json:async()=>({success:false})}],['missing acknowledgement',{ok:true,json:async()=>({})}]])test(label+' cannot become a subscription',async()=>{const r=await call(provider);assert.equal(r.code,502);assert.equal(r.data.success,false)});
