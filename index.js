const request = require('sync-request');
const {segment} = require('oicq');

function result(result){
    return result;
}
function yiyan(){
    var yiyanObj = request(`GET`,`https://v1.hitokoto.cn/?c=a&c=b&c=c&encode=json`)
    var yiyanData = JSON.parse(yiyanObj.getBody(`UTF8`));
    return yiyanData;
}
function retrunImg(){
    let imgecy=segment.image(`https://www.dmoe.cc/random.php`);
    return imgecy;
}
class pSignin extends NIL.ModuleBase{
    onStart(api){  
        api.logger.info('psignin加载成功');
        var signinList = new Array(300);
        api.listen('onMainMessageReceived',(e)=>{
            if(e.raw_message=='签到'){
                if(NIL._vanilla.wl_exists(e.sender.qq)){
                    var pl = NIL._vanilla.get_xboxid(e.sender.qq);
                    var money=Math.round(Math.random()*1000+10);
                    let ser = NIL.SERVERS.get('BDS');
                    var mem=e.sender.qq;
                    let res = signinList.some(qq => qq === mem)
                    if(res!=true){
                        signinList.unshift(mem);
                        ser.sendCMD(`money add ${pl} ${money}`,result);
                        var yiyanData=yiyan();
                        e.reply([`恭喜<${pl}>获得⌈${money}⌋个金币，上线看看⑧`,retrunImg(),yiyanData.hitokoto+`--`+yiyanData.from],`AT`);
                    }else{
                        e.reply(`你今天已经签到过了，令人感叹`,`AT`);
                    }

                }
                else{
                    e.reply(`你未添加绑定Xbox白名单，请绑定后再试`,`AT`);
                }
            }
        });
        var id=setInterval(function () {
            if (new Date().getMinutes()==59 &&new Date().getHours()==23&&new Date().getSeconds()==58){
                signinList.length=0;
            }
        },1000,id)
    }
    onStop(){

    }
}

module.exports = new pSignin;