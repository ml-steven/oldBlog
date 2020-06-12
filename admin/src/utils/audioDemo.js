/******************
《【教程】实时转码并上传-通用版》
作者：高坚果
时间：2019-10-22 23:04:49

通过onProcess回调可实现录音的实时处理；mp3和wav格式拥有极速转码特性，能做到边录音边转码；涉及Recorder两个核心方法：mock、SampleData。

如果不需要获得最终结果，可实时清理缓冲数据，避免占用过多内存，想录多久就录多久。

【拼接小技巧】测试结束后，可执行mp3、wav合并的demo代码，把所有片段拼接到一个文件

【mp3拼接】mp3格式因为lamejs采用的CBR编码，因此后端接收到了mp3片段后，通过简单的二进制拼接就能得到完整的长mp3；前端、后端实现拼接都可以参考mp3合并的demo代码。

【wav拼接】本库wav格式音频是用44字节wav头+PCM数据来构成的，因此只需要将所有片段去掉44字节后，通过简单的二进制拼接就能得到完整的长pcm数据，最后在加上44字节wav头就能得到完整的wav音频文件；前端、后端实现拼接都可以参考wav合并的demo代码。

【引入杂音、停顿问题】除wav外其他格式编码结果可能会比实际的PCM结果音频时长略长或略短，如果涉及到实时解码应留意此问题，长了的时候可截断首尾使解码后的PCM长度和录音的PCM长度一致（可能会增加噪音）；
wav格式最终拼接出来的音频音质比mp3的要好很多，因为wav拼接出来的PCM数据和录音得到的PCM数据是相同的；
但mp3拼接出来的就不一样了，因为每次mp3编码时都会引入首尾的静默数据，使音频时长略微变长，这部分静默数据听起来就像有杂音和停顿一样，在实时转码间隔很短的情况下尤其明显（比如50ms），但只要转码间隔比较大时（比如500ms），mp3的这种停顿就会感知不到，音质几乎可以达到和wav一样。

仅使用mp3格式时，请参考更优良的《【教程】实时转码并上传-MP3专版》采用的takeoffEncodeChunk实现，不会有停顿导致的杂音。
******************/
var testSampleRate = 8000;
var testBitRate = 16;

var SendInterval = 300;/******
转码发送间隔（实际间隔比这个变量值偏大点，取决于BufferSize）。这个值可以设置很大，但不能设置很低，毕竟转码和传输还是要花费一定时间的，设备性能低下可能还处理不过来。

mp3格式下一般大于500ms就能保证能够正常转码处理，wav大于100ms，剩下的问题就是传输速度了。由于转码操作都是串行的，录制过程中转码生成出来mp3顺序都是能够得到保证，但结束时最后几段数据可能产生顺序问题，需要留意。由于传输通道不一定稳定，后端接收到的顺序可能错乱，因此可以携带编号进行传输，完成后进行一次排序以纠正顺序错乱的问题。

mp3格式在间隔太低的情况下中间的停顿会非常明显，可适当调大间隔以规避此影响，因为mp3编码时首尾出现了填充的静默数据（mp3.js编码器内已尽力消除了这些静默，但还是会有些许的静默停顿）；wav格式没有此问题，测试时可以打开 testOutputWavLog + mp3、wav合并demo 来对比音质。

当出现性能问题时，可能音频编码不过来，将采取丢弃部分帧的策略。
******/

var _offset = 0, _byteLen = 0, restUint8 = null, restUint8Len = 0;
var realTimeSendTryTime = 0;
var realTimeSendTryChunk;

//=====实时处理核心函数==========
var RealTimeSendTry = function (rec,self) {
    var t1 = Date.now();
    if (realTimeSendTryTime == 0) {
        realTimeSendTryTime = t1;
        realTimeSendTryChunk = null;
    };
    if (t1 - realTimeSendTryTime < SendInterval) {
        return;//控制缓冲达到指定间隔才进行传输
    };
    realTimeSendTryTime = t1;

    //借用SampleData函数进行数据的连续处理，采样率转换是顺带的
    var chunk = Recorder.SampleData(rec.buffers, rec.srcSampleRate, testSampleRate, realTimeSendTryChunk, { frameType: 'wav' });

    //清理已处理完的缓冲数据，释放内存以支持长时间录音，最后完成录音时不能调用stop，因为数据已经被清掉了
    for (var i = realTimeSendTryChunk ? realTimeSendTryChunk.index : 0; i < chunk.index; i++) {
        rec.buffers[i] = null;
    };
    realTimeSendTryChunk = chunk;

    //没有新数据，或结束时的数据量太小，不传输
    if (chunk.data.byteLength == 0 || chunk.data.byteLength < 2560) {
        return;
    };
    if (self.ws && self.ws.readyState == WebSocket.OPEN) {
        var uint8Data = new Uint8Array(chunk.data);
        if(restUint8Len){
            const uint8Buffer = new Uint8Array(2560);
            for(let i=0;i<restUint8Len;i++){
                uint8Buffer[i] = restUint8[i]
            }
            for(let i =0;i<_offset;i++){
                uint8Buffer[restUint8Len+i] = uint8Data[i]
            }
            self.ws.send(uint8Buffer);
        }
        var NUM = Math.floor((uint8Data.byteLength-_offset) / 2560);
        while (NUM>0) {
            const sendUint8 = uint8Data.subarray(_offset, _offset+2560);
            self.ws.send(sendUint8);
            _offset = _offset + 2560;
            NUM--;
        }
        restUint8 = uint8Data.subarray(_offset);
        restUint8Len = uint8Data.byteLength - _offset;
        _offset = 2560 - restUint8Len;
    } else {
        //websocket 断开关闭录音
        rec && self.msgError("连接已中断");
        rec && rec.close();
        self.ws = null; //清空
        rec = null;
        self.isOpenFlag = false;
        _offset = 0, _byteLen = 0, restUint8 = null, restUint8Len = 0;
    }
};

//调用录音
var rec;
function recStart(type) {
    if (rec) {
        rec.close();
    };
    rec = Recorder({
        type: type
        , onProcess: function (buffers, powerLevel, bufferDuration, bufferSampleRate) {
            RealTimeSendTry(rec);//推入实时处理，因为是unknown格式，这里简化函数调用，没有用到buffers和bufferSampleRate，因为这些数据和rec.buffers是完全相同的。
        }
    });

    var t = setTimeout(function () {
        console.Log("无法录音：权限请求被忽略", 1);
    }, 8000);

    rec.open(function () {//打开麦克风授权获得相关资源
        clearTimeout(t);
        rec.start();//开始录音
    }, function () {
        clearTimeout(t);
    });
};
function recStop() {
    rec.close();//直接close掉即可，这个例子不需要获得最终的音频文件
};