const fs=require('fs'),path=require('path'),crypto=require('crypto'),babel=require('@babel/core');
const root=path.resolve(__dirname,'..');
const target=path.join(root,'_ds_bundle.js');
const old=fs.readFileSync(target,'utf8');
const meta=JSON.parse(old.split('/* @ds-bundle: ')[1].split(' */')[0]);
let output='';
for(const file of Object.keys(meta.sourceHashes)){
 let source=fs.readFileSync(path.join(root,file),'utf8');
 meta.sourceHashes[file]=crypto.createHash('sha256').update(source).digest('hex').slice(0,12);
 source=source.replace(/^import React[^\n]*\n/gm,'').replace(/^import\s*\{([^}]+)\}\s*from[^\n]*\n/gm,(_,names)=>`const {${names}}=__ds_scope;\n`).replace(/^export\s+/gm,'');
 const code=babel.transformSync(source,{filename:file,plugins:[['@babel/plugin-transform-react-jsx',{runtime:'classic'}]],configFile:false,babelrc:false}).code;
 const names=meta.components.filter(c=>c.sourcePath===file).map(c=>c.name);
 output+=`\n// ${file}\ntry { (() => {\n${code}\n${names.map(n=>`__ds_scope.${n}=${n};__ds_ns.${n}=${n};`).join('\n')}\n})(); } catch(e){__ds_ns.__errors.push({path:${JSON.stringify(file)},error:String(e.message||e)});}\n`;
}
fs.writeFileSync(target,`/* @ds-bundle: ${JSON.stringify(meta)} */\n(()=>{const __ds_ns=(window.${meta.namespace}=window.${meta.namespace}||{});const __ds_scope={};__ds_ns.__errors=[];${output}\n})();\n`);
console.log('Rebuilt',Object.keys(meta.sourceHashes).length,'source units');
