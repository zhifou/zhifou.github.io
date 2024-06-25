---
layout: post
title: ffmpeg 是一个命令行音视频后期处理软件
date: 2024-02-24 16:30:00
categories: [音视频]
tags: [ffmpeg, ffplay]
---

## ffmpeg 是一个命令行音视频后期处理软件

#### 参数列表

- \-**i** **input**\_file：指定输入文件的路径和名称。示例：-**i** **input**.mp4
- \-ss position：指定从输入文件的哪个时间位置开始处理，格式为 HH:MM:SS.xxx（小时:分钟:秒.毫秒）。示例：-ss 00:01:30.500 表示从 1 分 30.5 秒开始处理。
- \-t duration：指定处理的持续时间，格式为 HH:MM:SS.xxx（小时:分钟:秒.毫秒）。示例：-t 00:00:45 表示处理 45 秒的内容。
- \-vf filtergraph：指定视频过滤器图形，用于对视频进行各种处理，如调整大小、裁剪、旋转、滤镜等。示例：-vf "scale=640:480" 表示将视频调整为 640x480 的大小。
- \-af filtergraph：指定音频过滤器图形，用于对音频进行各种处理，如音频增益、降噪、混音等。示例：-af "volume=2.0" 表示将音频增益调整为原来的 2 倍。
- \-c:v codec：指定视频编解码器。示例：-c:v libx264 表示使用 libx264 编码器进行视频编码。
- \-c:a codec：指定音频编解码器。示例：-c:a aac 表示使用 AAC 编码器进行音频编码。
- \-b:v bitrate：指定视频的比特率，即视频的质量。较高的比特率通常意味着更好的视频质量，但文件大小也会增加。示例：-b:v 1000k 表示视频比特率为 1000kbps。
- \-b:a bitrate：指定音频的比特率，即音频的质量。较高的比特率通常意味着更好的音频质量，但文件大小也会增加。示例：-b:a 128k 表示音频比特率为 128kbps。
- \-r framerate：指定视频的帧率，即每秒播放的画面数量。较高的帧率可以获得更流畅的视频，但也会增加文件大小。示例：-r 30 表示视频帧率为 30 帧每秒。
- -y 不询问直接覆盖原有的同名文件

## 1. 裁剪命令

#### 参数说明

- \-i  input\_file：指定输入文件的路径和名称。示例：-i  input.mp3

- \-ss position：指定从输入文件的哪个时间位置开始处理，格式为 HH:MM:SS.xxx（小时:分钟:秒.毫秒）。示例：-ss 00:01:30.500 表示从 1 分 30.5 秒开始处理。

- \-t duration：指定处理的持续时间，格式为 HH:MM:SS.xxx（小时:分钟:秒.毫秒）。示例：-t 00:00:45 表示处理 45 秒的内容。

- -to 终止点时间

- -c copy 表示不改变音频和视频的编码格式，直接拷贝，提升效率

- output.mp3 为处理结果文件

  ```shell
  ffmpeg -i input.mp3 -ss 00:00:xx -t 120 -y output.mp3
  ffmpeg -i input.mp3 -ss 10 -t 230 output.mp3
  ffmpeg -i test.mp3 -ss 00:01:30 -to 00:02:30 -c copy test_cut.mp3
  
  # 截取视频片段
  ffmpeg -i input.mp4 -ss 04:10 -t 16 -c copy -avoid_negative_ts make_zero output.mp4
  ```

## 2. 合成命令

### 2.1 混合合成

#### 参数说明

- -i 文件 1.mp3 和 2.mp3 为待合成的两个源文件

- -filter_complex 过滤器参数

- amix=inputs 配置输入的整体样本数

- duration，first：长度取决于第一个文件，longest：长度取决于时间最长文件，shortest：长度取决于时间最短文件

- dropout_transition：输入流结束时用于体积重新规范化的过渡时间

- -f mp3 设置导出文件格式

  ```shell
  ffmpeg -i 1.mp3 -i 2.mp3 -filter_complex amix=inputs=2:duration=first:dropout_transition=2 -f mp3 remix.mp3
  ```

### 2.2 连接合成

#### 参数说明

- concat 合并文件指令

  ```shell
  ffmpeg -i "concat:Box01.mp3|Box02.mp3" Box.mp3
  ffmpeg -i "concat:headerNew.mp3|006.mp3" -acodec copy demo6.mp3
  ```

- 使用txt文件集合concat合并，视频合并使用这个list合并方式

  ```shell
  # 将两个 flv 文件合并
  ffmpeg -f concat -i videolist.txt -c copy output.flv
  ffmpeg -f concat -safe 0 -i list.txt -c copy output-he.mp4
  
  ## input.txt 中的内容
  file 'xj1.flv'
  file 'xj2.flv'
  ```

### 2.3 淡出效果

#### 参数说明

- afade 淡入淡出指令

- 从 st 秒开始，经过 d 秒钟的淡出效果

  ```shell
  ffmpeg -i bgm3.mp3  -filter_complex afade=t=out:st=16:d=4 bgm31.mp3
  ```

### 2.4 合并音频

#### 参数说明

```shell
ffmpeg -i output.mp3 -i output_dvolume.mp3 -filter_complex "[0:a][1:a]concat=n=2:v=0:a=1[out]" -map "[out]" merge_output.mp3
```

### 2.5 合并视频

首先需要将原视频的声音删除。这里的文件名需要加上英文引号，如果不加的话，会提示No such file or directory。

```shell
ffmpeg -i "audio.mp4" -y -f mp4 -an -codec copy -q:v 1 "audio-无声.mp4"
```

然后将无声视频和音频融合

```shell
ffmpeg -i audio-无声.mp4 -i accompaniment.wav -c:v copy -c:a aac -strict experimental audio-消音.mp4
```

即可获得消去人声的视频。但笔者口语不好，觉得原视频的语速有些快了，故又调整了视频倍速为0.8倍速。

```shell
ffmpeg -i test.mp4 -filter_complex "[0:v]setpts=10/8*PTS[v];[0:a]atempo=0.8[a]" -map "[v]" -map "[a]" test-2.mp4
```

这条指令同时调整视频倍速和音频倍速，setpts=(倍速的倒数)*PTS[v]，atempo=(倍速)[a]

### 2.6 添加水印

```shell
# 在左上角0,0点添加水印
ffmpeg -y -i tmp.mp4 -i green.png -filter_complex 'overlay=x=0:y=0' output.mp4

# 使用华文行楷字体，64字号，红色字，在右上角写水印文字，main_w-text_w-10 就是视频宽度减文字宽度再减 10
ffmpeg -y -i source.mp4 -vf "drawtext=fontfile=STXINGKA.ttf: text='水印文字':x=main_w-text_w-10:y=10:fontsize=64:fontcolor=red:shadowy=2" output.mp4
```

### 2.7 抠像合并

- \-vf filtergraph：指定视频过滤器图形，用于对视频进行各种处理，如调整大小、裁剪、旋转、滤镜等。示例：-vf "scale=640:480" 表示将视频调整为 640x480 的大小。

```shell
# 绿幕抠像后合并
ffmpeg -i jmfst.mp4 -i greentiger.mp4 -shortest -filter_complex "[1:v]chromakey=0x16ff0a:0.1:0.0[ckout];[0:v][ckout]overlay[out]" -map "[out]" -y output.mp4

# 基于 mask 抠像后合并
ffmpeg -i video.mp4 -i matte.mp4 -i background.mp4 -filter_complex '[1][0]scale2ref[mask][main];[main][mask]alphamerge[vid];[2:v][vid]overlay[out]' -map [out] complete.mp4
```

## 3. 转换命令

### 3.1 格式转换

#### 参数说明

- -i 文件，a.mp3 为待处理源文件

- -ar 音频抽样率

- -ac 音频Channel数

- -f 强制输出格式 例如mp3, wav等

  ```shell
  # 将a.mp3转化程a.wav，设定抽样率为16000
  ffmpeg -i a.mp3 -ar 16000 -ac 1 a.wav
  
  # 将Frozen.mka转化成a.mp3
  ffmpeg -i Frozen.mka -ar 16000 -f mp3 a.mp3
  
  # 将图片转为视频
  ffmpeg -loop 1 -f image2 -i test2.png -vcodec libx264 -r 30 -t 3 test2.mp4
  
  # 替换视频中的音频轨
  ffmpeg -i input.mp4 -i trll.mp3 -map 0:v -map 1:a -c:v copy -shortest -y output.mp4
  
  # 将wav文件转为mp3文件
  ffmpeg -i output.wav -c:a libmp3lame output.mp3
  
  # 将mp3文件转为aac文件
  ffmpeg -i input.mp3 -acodec aac -strict experimental -y output.aac
  ```

### 3.2 图片格式转换

```shell
ffmpeg -i input.bmp out.jpg
ffmpeg -i input.bmp out.png
```

## 4. 调整命令

### 4.1 音量调整

#### 参数说明

- -i 文件，input.mp3 为待处理源文件

- \-af filtergraph：指定音频过滤器图形，用于对音频进行各种处理，如音频增益、降噪、混音等。示例：-af "volume=2.0" 表示将音频增益调整为原来的 2 倍。

  ```shell
  # 音量256为原始音量，如果要调整到两倍音量，则设置为512，调整到一半音量，则设为128，下面为减小一半音量的命令
  ffmpeg -i input.mp3 -vol 128 output.mp3
  
  # 使用dB调整音量
  ffmpeg -i input.mp3 -af volume=-20dB output.mp3
  ```

  **dB的换算公式**
  1.1 dB = 1.1 倍，2 dB = 1.25倍，3 dB = 1.4倍，6 dB = 2 倍，10 dB = 3 倍，20 dB = 10 倍，30 dB = 30 倍。其它就可以用上述数值换算，并不困难。(反过来 – 6 dB 就是 1/2 = 0.5)
  2.在换算时要把握一个原则，dB数值的相加 等于 倍数的相乘。
  例如：40 dB = 20dB + 20 dB = 10 * 10 = 100 倍
  -20dB谱宽就是信号衰减到十分之一时的频谱带宽。

### 4.2 升降调

```shell
# 升半音
ffmpeg -i "mine.mkv" -filter_complex "asetrate=48000*2^(1/12),atempo=1/2^(1/12)" "output.mkv"
# 升全音
ffmpeg -i "mine.mkv" -filter_complex "asetrate=48000*2^(2/12),atempo=1/2^(2/12)" "output.mkv"
# 降半音
ffmpeg -i "mine.mkv" -filter_complex "asetrate=48000*2^(-1/12),atempo=1/2^(-1/12)" "output.mkv"
# 降全音
ffmpeg -i "mine.mkv" -filter_complex "asetrate=48000*2^(-2/12),atempo=1/2^(-2/12)" "output.mkv"
```

### 4.3 音频速率调整

改变音频速率最简单的方法是直接调整音频的采样率，但是与此同时，这种方法会改变音频的音色。目前一般采用对原音进行重采样，差值等方法来实现。下面这行命令的倍率调整范围为0.5到2。

```shell
ffmpeg -i input.mkv -filter:a "atempo=2.0" -vn output.mkv
```

如果想要再快的话，需要更改命令，通过将多个atempo过滤器串接在一起来绕过这个限制。

```shell
ffmpeg -i input.mkv -filter:a "atempo=2.0,atempo=2.0" -vn output.mkv
```

将对输入文件 test_cut.mp3 应用音频效果，包括加速 2 倍(atempo)、高通滤波器(highpass)和低通滤波器(lowpass)，并保存为 test_cut_ahl.mp3

```shell
ffmpeg -i test_cut.mp3 -af "atempo=2.0, highpass=f=200, lowpass=f=3000" test_cut_ahl.mp3
```

### 4.4 视频速率调整

改变视频的播放速率是通过修改视频的表示时间戳（PTS）来实现的。举个简单的例子，如果在时间戳1和2处显示两个连续帧，我们想要加快视频速度，那么这两个时间戳需要分别变为0.5和1。因此，我们必须把他们乘以0.5。

```shell
ffmpeg -i input.mkv -r 16 -filter:v "setpts=0.5*PTS" output.mkv
```

对视频进行加速时，为了不丢帧，可以利用-r 参数指定输出的fps。
一般来说，视频倍速还需要将视频中的音频也一同倍速，通过混合的过滤图实现，命令如下，

```shell
ffmpeg -i input.mkv -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2.0[a]" -map "[v]" -map "[a]" output.mkv
```

### 4.5 添加封面

从 test.mp3 音频文件中提取音频流，并从 test.jpeg 图像文件中提取封面图像。然后，它将使用-map 选项将音频流和封面图像流映射到输出文件。-c copy 选项用于直接复制音频流和封面图像流，而不进行重新编码。-id3v2_version 3 选项用于设置 ID3 标签版本为 3，以确保兼容性。-metadata:s:v 选项用于指定封面图像的元数据，如标题和注释。

```shell
ffmpeg -i test.mp3 -i test.jpeg -map 0 -map 1 -c copy -id3v2_version 3 -metadata:s:v title="Album cover" -metadata:s:v comment="Cover (Front)" test_cover.mp3
```

## 5. 提取命令

### 5.1 从视频中提取音频

#### 参数说明

- -map 提取视频-音频流的序号
- -b:a 码率 kb/s
- -f 强制输出格式 例如mp3, wav等
- -vn 表示去除视频流，v 代表视频，n 代表 no 也就是无视频的意思
- acodec: 指定音频编码器，copy 指明只拷贝，不做编解码

```shell
# 从视频中导出音频
ffmpeg -i input.mp4 output.mp3
# 从frozen.mkv中，提取音频文件，保存为audio.1.mp3
ffmpeg -i test.mp4 -vn test.mp3
ffmpeg -i frozen.mkv -map 0:1 -b:a 64k -f mp3 a.1.mp3
ffmpeg -i frozen.mp4 -q:a 0 -map a audio.mp3
ffmpeg -i frozen.mp4 -vn -codec copy audio.m4a
ffmpeg -i audio.m4a -y -acodec libmp3lame -aq 0 audio.mp3
ffmpeg -i input.mp4 -acodec copy -vn out.aac

# 提取音频PCM数据
ffmpeg -i out.mp4 -vn -ar 44100 -ac 2 -f s16le out.pcm

# 播放测试
ffplay -ar 44100 -ac 2 -f s16le -i out.pcm

# PCM转WAV
ffmpeg -f s16be -ar 8000 -ac 2 -acodec pcm_s16be -i input.raw output.wav
```

**查看视频，包含的视频流、音频流如下：**
encoder         : libebml v1.2.3 + libmatroska v1.3.0
Duration: 01:42:13.09, start: 0.000000, bitrate: 2954 kb/s
Stream #0:0: Video: h264 (High), yuv420p, 1024x576 [SAR 1:1 DAR 16:9], 23.98 fps
Stream #0:1(eng): Audio: ac3, 48000 Hz, 384 kb/s (default)  title           : 英语
Stream #0:2(chi): Audio: ac3, 48000 Hz, 384 kb/s                  title           : 台配
Stream #0:3(chi): Audio: ac3, 48000 Hz, 384 kb/s                  title           : 粤语

**查看原音视频文件音轨频率**

```shell
ffmpeg -i "mine.mkv"
```

命令执行后找到音轨的Stream，频率为48000Hz；

```shell
 Stream #0:0(und): Video: h264 (High) (avc1 / 0x31637661), yuv420p(tv, bt709), 2316x1440, 22449 kb/s, 30 fps, 30 tbr, 600 tbn, 1200 tbc (default)
    Metadata:
      creation_time   : 2022-08-31T02:15:18.000000Z
      handler_name    : Core Media Video
      vendor_id       : [0][0][0][0]
      encoder         : H.264
  Stream #0:1(und): Audio: aac (LC) (mp4a / 0x6134706D), 48000 Hz, stereo, fltp, 2 kb/s (default)
    Metadata:
      creation_time   : 2022-08-31T02:15:18.000000Z
      handler_name    : Core Media Audio
      vendor_id       : [0][0][0][0]
```

### 5.2 提取YUV

- -c:v rawvideo 指定将视频转成原始数据
- -pixel_format yuv420p 指定转换格式为 yuv420p

```shell
# 从mp4中提取YUV数据
ffmpeg -i input.mp4 -an -c:v rawvideo -pixel_format yuv420p out.yuv

# 播放测试
ffplay -s wxh out.yuv

# 视频YUV转H264
ffmpeg -f rawvideo -pix_fmt yuv420p -s 640x480 -r 30 -i out.yuv -c:v libx264 -f rawvideo out.h264
```

## 6. 消音命令

#### 参数说明

- -i 文件，input.mp3 为待处理源文件

- -ac 音频Channel数

  ```shell
  ffmpeg -i input.mp3 -af pan="stereo|c0=c0|c1=-1*c1" -ac 1 output.mp3
  ffmpeg -i input.mp3 -af "pan=stereo|c0<c0+c1|c1<c0+c1" output.mp3
  
  # 消除视频中部份声音
  # ffmpeg -i ad.mp4 -af "volume=enable='between(t,2,9)':volume=0,volume=enable='between(t,15,20)':volume=0" adb.mp4
  ffmpeg -i ad.mp4 -af "volume=enable='between(t,2,9)':volume=0" adb.mp4
  ```

## 7. 录制命令

#### 参数说明

- -f avfoundation 输入设备，从 Mac 的音频输入设备（通常是麦克风）录制音频

- -i 指定从哪儿采集数据，它是一个文件索引号。在我的电脑上，1 代表桌面（可以通过上面的命令查询设备索引号）

- -r 指定帧率。按 ffmpeg 官方文档说-r 与-framerate 作用相同，但实际测试时发现不同。-framerate 用于限制输入，而-r 用于限制输出。

- -framerate 限制视频的采集帧率。这个必须要根据提示要求进行设置，如果不设置就会报错。

- ":0" 参数表示默认的音频输入设备

- "1:0" 参数表示"视频输入设备:音频输入设备" 

  ```shell
  # 查询录制设备
  ffmpeg -f avfoundation -list_devices true -i ""
  
  # 录制音频
  ffmpeg -f avfoundation -i ":0" output.wav
  
  # 录制音频裸数据
  ffmpeg -f avfoundation -i :0 -ar 44100 -f s16le out.pcm
  
  # 录制视频
  ffmpeg -f avfoundation -i "1:0" out.avi
  ffmpeg -framerate 30 -f avfoundation -i 0 out.mp4
  
  # 视频+音频
  ffmpeg -framerate 30 -f avfoundation -i 0:0 out.mp4
  
  # 录屏
  ffmpeg -f avfoundation -i 1 -r 30 out.yuv
  
  # 录屏+声音
  ffmpeg -f avfoundation -i 1:0 -r 29.97 -c:v libx264 -crf 0 -c:a libfdk_aac -profile:a aac_he_v2 -b:a 48k out.flv
  ```

## 8. 视频处理

### 8.1 视频转码

```shell
ffmpeg -i input.avi output.mp4
ffmpeg -i input.mp4 -vcodec copy -acodec copy output.flv
```

### 8.2 抽取视频流

- vcodec: 指定视频编码器，copy 指明只拷贝，不做编解码。
- an: a 代表视频，n 代表 no 也就是无音频的意思。

```shell
ffmpeg -i input.mp4 -vcodec copy -an out.h264

ffmpeg -i input.mp4 -vcodec copy -an output.mp4
```

### 8.2 视频压缩

- -b:v 视频码率设置
- -vf scale 指定使用简单过滤器 scale，iw/2:-1 中的 iw 指定按整型取视频的宽度。-1表示高度随宽度一起变化。

```shell
# 压缩的文件更大更清晰，一般情况下不用
ffmpeg -i test_ffmpeg.mp4

# 减小视频码率，压缩的更模糊
ffmpeg -i out.MP4 -b:v 500k 512k_out.mp4

# 通过scale缩放视频
fmpeg -i input.mp4 -vf scale=iw/2:-1 output.mp4
ffmpeg -i input.mpg -vf scale=iw/2:ih/2 output.mp4
ffmpeg -i input.mpg -vf scale=iw*0.9:ih*0.9 output.mp4
# 用黄金比例缩放输入值= 1.61803398874989484820
ffmpeg -i input.mpg -vf scale=iw/PHI:ih/PHI output.mp4

# 降低视频的分辨率且转换视频格式
ffmpeg -i input.avi -vf scale=640:360 out.mp4

# 音视频合并，从使用看.h264格式的视频会出现抖动现象
ffmpeg -i out.h264 -i out.aac -vcodec copy -acodec copy out.mp4
```

### 8.2 视频速率调整

- -vf scale 指定使用简单过滤器 scale，iw/2:-1 中的 iw 指定按整型取视频的宽度。-1表示高度随宽度一起变化。

```shell
# 把视频的帧速率变为0.98倍，变慢了
ffmpeg -i input.mp4 -vf setpts=PTS/0.98 -af atempo=2 output-3.mp4
```

### 8.3 视频裁剪

- crop 格式：crop=w:h:x :y

  - w: 输出的宽度。可以使用 in_w 表式输入视频的宽度。
  - h: 输出的高度。可以使用 in_h 表式输入视频的高度。
  - x : X 坐标
  - y : Y 坐标

  如果 x 和 y 设置为 0,说明从左上角开始裁剪。如果不写是从中心点裁剪。

- -strict -2 指明音频使有 AAC

- -f hls 转成 m3u8 格式

- -vf 视频过滤

```shell
# 基本的裁剪过滤器
ffmpeg -i input.mp4 -vf "crop=w:h:x:y" output.mp4

# 输入视频裁剪为 640x480 像素，当不指定位置时x:y，FFmpeg 会自动从中心裁剪输入视频
ffmpeg -i input.mp4 -vf "crop=640:480" output.mp4

# 按照尺寸和未知裁剪视频
ffmpeg -i input.mov  -vf crop=in_w-300:in_h-200 -c:v libx264 -c:a copy -video_size 1280x720 output.mp4

# 有时，视频周围会有黑色边框以适应宽高比。在这种情况下，您可以使用“ cropDetect ”过滤器来自动检测裁剪尺寸和位置。滤镜将检测输入视频的非黑色区域，然后计算并打印建议的裁剪尺寸和位置
ffmpeg -i input.mp4 -vf cropdetect -f null - 2>&1 | awk '/crop/ { print $NF }' | tail -1

# HLS切片，制作m3u8格式
ffmpeg -i input.mp4 -c copy -map 0 -f segment -segment_list playlist.m3u8 -segment_time 5 output%03d.ts
```

### 8.4 视频翻转

- hflip 水平翻转
- 如果要修改为垂直翻转可以用 vflip

```shell
ffmpeg  -i input.mp4 -filter_complex "[0:v]pad=w=2*iw[a];[0:v]hflip[b];[a][b]overlay=x=w" output.mp4
```

### 8.5 视频截图

- 从上面的 out.mp4 中提取第 10 秒的视频帧，并将其保存为输出文件 output.jpg。参数-vframes 1表示只提取一帧。

```shell
# 按照帧位置提取图片
ffmpeg -i input.mp4 -ss 00:00:10 -vframes 1 output.jpg

# 设置视频帧为1，从中抽取图片
ffmpeg -i input.mp4 -vf fps=1 %04d.png

# 全视频转图片集合
ffmpeg -r 1 -i output-1.mp4 -r 1 images "images/$filename%03d.png"

# 图片集合转视频
ffmpeg -r 1/5 -i image2/%03d.png -c:v libx264 -vf fps=25 -pix_fmt yuv420p output.mp4

# 视频转GIF，从23秒开始，向后取3.8秒，做成一个gif图片
ffmpeg -ss 23.0 -t 3.8 -i input.mp4 output_trimmed.gif

```

### 8.6 去除水印

```shell
# 去除视频input.mp4中位置在左上角(160, 756)，宽度398高度108的矩形范围
ffmpeg -i input.mp4 -filter_complex "delogo=x=160:y=756:w=398:h=108" output.mp4
```

### 8.7 添加水印

- -vf 中的 movie 指定 logo 位置。scale 指定 logo 大小。overlay 指定 logo 摆放的位置

```shell
# 图片水印
ffmpeg -i out.mp4  -vf "movie=logo.png,scale=128:72[watermask];[in][watermask] overlay=96:54 [out]" water_img.mp4

# 把图片水印，放到左下角，overlay=0:(main_h-overlay_h)
ffmpeg -i input.mp4 -i watermark.png -filter_complex "[1][0]scale2ref=oh*mdar:ih*0.2[logo][video];[video][logo]overlay=0:(main_h-overlay_h)" output_bottom_left.mp4

# 文字水印
ffmpeg -i out.mp4 -vf "drawtext=fontfile=FZBaoHTJW_Xi.TTF: text='anyRTC':x=128:y=72:fontsize=24:fontcolor=red:shadowy=2" water_text.mp4

# 给GIF上增加文字
ffmpeg -i input.gif -vf "drawtext=text='When my code works the first time':fontsize=30:x=10:y=10:fontcolor=white:fontfile=C:/Windows/Fonts/Arial.ttf" output_font.gif
ffmpeg -i input.gif -vf "drawtext=text='When my code works ':fontsize=30:x=10:y=10:fontcolor=white,drawtext=text='the first time':fontsize=30:x=10:y=(10+text_h):fontcolor=white" output_break.gif

```

### 8.8 添加字幕

- -vf 中的 subtitles指定字幕文件位置

```shell
# 视频添加字幕srt
ffmpeg -i video_test.mp4 -vf subtitles=subtitle.srt out_subtitle.mp4

# 视频添加音乐+字幕
ffmpeg -i video_test.mp4 -i audio_bg.mp3 -vf subtitles=all_mp3_srt.srt out_mp3_subtitle.mp4
```

### 8.9 添加thumbnail，文件管理时看到的封面

- -vf 中的 subtitles指定字幕文件位置

```shell
# 给视频文件添加thumbnail
ffmpeg -i output-he.mp4 -i zhifou.png -map 1 -map 0 -c copy -disposition:0 attached_pic output.mp4
```

## 

## 9. 下载命令

#### 参数说明

- -i 文件，待处理源文件

  ```shell
  # 将在线 flv 流保存到本地
  ffmpeg -i http://demo.com/input.flv -c copy dump.flv
  
  # 将本地视频以 rtmp 协议推流
  ffmpeg -re -i ./demo.mp4 -c copy -f flv rtmp://publish.com/live/demo123456
  
  # m3u8视频下载
  ffmpeg -protocol_whitelist concat,file,http,https,tcp,tls,crypto  -i  你的.m3u8 -c copy output.mp4
  ffmpeg -protocol_whitelist concat,file,http,https,tcp,tls,crypto  -i  https://xxx.m3u8 -c copy output.mp4
  
  # 快手视频下载
  # 直接使用Downie4下载
  
  # 优酷视频下载
  # 直接使用Downie4下载，或者找到网络请求里的mp4文件，用Downie4下载
  
  ```

  ## 推荐

- [FFmpeg](https://github.com/FFmpeg/FFmpeg)

- [知否](http://zhifou.co/ffmpeg-intro)