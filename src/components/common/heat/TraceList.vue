<template lang="html">
  <div id="tload">
    <!--存放百度地图容器-->
    <div id="tcontainer"></div>
  </div>
</template>

<script>
  import {getHeat} from 'network/home'
  export default {
    name: "TraceList",
    create(){

    },
    data() {
      return {
        // 热力图的点数据，lng：点的经度 点的lat纬度 count：点的热力程度
        points: [
          new BMap.Point(121.42402,31.20622),
          new BMap.Point(121.42402,31.20622),
          new BMap.Point(121.42402,31.20622),
          new BMap.Point(121.42402,31.20622),
          new BMap.Point(121.42402,31.20622),
          new BMap.Point(121.42402,31.20622),
          new BMap.Point(121.42402,31.20622),
          new BMap.Point(121.42402,31.20622),
          new BMap.Point(121.42402,31.20622),
          new BMap.Point(121.35239,31.20531),
          new BMap.Point(121.35239,31.20531),
          new BMap.Point(121.353056,31.196179),
          new BMap.Point(121.35239,31.20531),
          new BMap.Point(121.35239,31.20531),
          new BMap.Point(121.353056,31.196179),
          new BMap.Point(121.353056,31.196179),
          new BMap.Point(121.37006,31.18399),
          new BMap.Point(121.37006,31.18399),
          new BMap.Point(121.353056,31.196179),
          new BMap.Point(121.353056,31.196179),
          new BMap.Point(121.36038,31.20013),
          new BMap.Point(121.3961111,31.20027778),
          new BMap.Point(121.3961111,31.20027778),
          new BMap.Point(121.3961111,31.20027778),
          new BMap.Point(121.353056,31.196179)
        ],
        marks:[
          {"lng":121.42402,"lat":31.20622,"address":"新华路街道"},
          {"lng":121.35239,"lat":31.20531,"address":"新泾镇"},
          {"lng":121.353056,"lat":31.196179,"address":"程家桥街道"},
          {"lng":121.36038,"lat":31.20013,"address":"新泾镇"},
          {"lng":121.37006,"lat":31.18399,"address":"虹桥镇"},
          {"lng":121.3961111,"lat":31.20027778,"address":"虹桥街道"}
        ],
        map: '',// 保存地图实例
        centerLng: '121.42402', // 经度
        centerLat: '31.20622', // 纬度
        trackLine: {},// 热力图覆盖物
      }
    },
    methods: {
      // 创建和初始化地图函数
      initMap(){
        this.createMap();// 创建地图
        this.initHeatMap();// 添加热力图覆盖物
      },
      // 方法 - 创建地图
      createMap(){
        // 在百度地图容器中创建地图实例
        let map = new BMap.Map("tcontainer");
        // 将map变量存储在全局
        this.map = map;
        // 设定地图的中心点和坐标
        let point = new BMap.Point(this.centerLng, this.centerLat);
        // 设置中心点坐标和地图级别
        this.map.centerAndZoom(point, 15);
        // 允许滚轮缩放
        this.map.enableScrollWheelZoom(point, 15);
        // 添加左上角缩放比例尺(offset: new BMap.Size(0, 0)为比例尺的坐标位置)
        var opts = {offset: new BMap.Size(10, 10)}
        this.map.addControl(new BMap.NavigationControl(opts));
        // 设置地图默认缩放比例
        this.map.setZoom(15);
      },
      // 方法 - 添加热力图覆盖物
      initHeatMap () {
        //绘制箭头及其样式
        var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
          scale: 0.6,//图标缩放大小
          strokeColor:'#fff',//设置矢量图标的线填充颜色
          strokeWeight: 2,//设置线宽
        });
        var icons = new BMap.IconSequence(sy, '100%', '10%',false);//设置为true，可以对轨迹进行编辑
        //绘制折线以及样式
        this.trackLine = new BMap.Polyline(this.points,{
          strokeColor:"red",//设置颜色
          strokeWeight:8,//宽度
          strokeOpacity:0.8,//折线的透明度，取值范围0 - 1
          icons:[icons]
        });
        // 清除图层(每次重新调用需要清除上一个覆盖物图层)
        this.map.clearOverlays();
        // 添加热力覆盖物
        this.map.addOverlay(this.trackLine);
        //this.map.addOverlay(this.trackLine);
        //this.heatmapOverlay.setDataSet({data: this.heats, max: 100});
        // 显示热力图，隐藏为this.heatmapOverlay.hide();
        this.trackLine.show();

        // for(let i=0;i< this.marks.length;i++){
        //   let marker = new BMap.Marker(this.marks[i].lng,this.marks[i].lat);
        //   this.map.addOverlay(marker);
        //   let  label = new BMap.Label(this.marks[i].address,{offset:new BMap.Size(20,-10)});
        //   marker.setLabel(label);
        // }

        let marker1 = new BMap.Marker(new BMap.Point(121.42402,31.20622));  // 创建标注
        this.map.addOverlay(marker1);              // 将标注添加到地图中

        let  label1 = new BMap.Label("时间：2020-01-20 11:27:47--12:47:51 <br />次数：10次<br/>街道：新华路街道",{offset:new BMap.Size(20,-10)});
        label1.setStyle({
          fontSize : "14px",
          fontFamily:"微软雅黑"
        });
        marker1.setLabel(label1);

        let marker2 = new BMap.Marker(new BMap.Point(121.35239,31.20531));  // 创建标注
        this.map.addOverlay(marker2);              // 将标注添加到地图中

        let  label2 = new BMap.Label("时间1：2020-01-21 13:47:36--13:48:03 <br />时间2：2020-01-22 18:06:25--18:07:41<br />次数：4次<br/>街道：新泾镇",{offset:new BMap.Size(-20,-85)});
        label2.setStyle({
          fontSize : "14px",
          fontFamily:"微软雅黑"
        });
        marker2.setLabel(label2);

        let marker3 = new BMap.Marker(new BMap.Point(121.353056,31.196179));  // 创建标注
        this.map.addOverlay(marker3);              // 将标注添加到地图中

        //let  label3 = new BMap.Label("时间1：2020-01-21 15:49:12 <br /> 时间2：2020-01-23 15:51:22--01-24 13:08:43 <br /> 时间3：2020-01-24 16:18:49--01-25 14:40:01 <br /> 时间4：2020-01-25 17:33:15<br /> 次数：6次<br/>街道：程家桥街道",{offset:new BMap.Size(-280,-10)});
        let  label3 = new BMap.Label("时间1：2020-01-21 15:49:12 <br /> 时间2：2020-01-25 17:33:15<br /> 次数：6次<br/>街道：程家桥街道",{offset:new BMap.Size(-180,-10)});
        label3.setStyle({
          fontSize : "14px",
          fontFamily:"微软雅黑"
        });
        marker3.setLabel(label3);

        let marker4 = new BMap.Marker(new BMap.Point(121.36038,31.20013));  // 创建标注
        this.map.addOverlay(marker4);              // 将标注添加到地图中

        let  label4 = new BMap.Label("时间：2020-01-25 14:42:07 <br />次数：1次<br/>街道：新泾镇",{offset:new BMap.Size(20,-50)});
        label4.setStyle({
          fontSize : "14px",
          fontFamily:"微软雅黑"
        });
        marker4.setLabel(label4);

        let marker5 = new BMap.Marker(new BMap.Point(121.37006,31.18399));  // 创建标注
        this.map.addOverlay(marker5);              // 将标注添加到地图中

        let  label5 = new BMap.Label("时间：2020-01-24 14:54:42--15:02:09 <br />次数：2次<br/>街道：虹桥镇",{offset:new BMap.Size(20,-10)});
        label5.setStyle({
          fontSize : "14px",
          fontFamily:"微软雅黑"
        });
        marker5.setLabel(label5);

        let marker6= new BMap.Marker(new BMap.Point(121.3961111,31.20027778));  // 创建标注
        this.map.addOverlay(marker6);              // 将标注添加到地图中

        let  label6= new BMap.Label("时间：2020-01-25 17:13:38--17:17:52 <br />次数：3次<br/>街道：虹桥街道",{offset:new BMap.Size(20,-10)});
        label6.setStyle({
          fontSize : "14px",
          fontFamily:"微软雅黑"
        });
        marker6.setLabel(label6);

      }
    },
    mounted() {
      // 创建和初始化地图函数
      this.initMap();
    }
  }
</script>

<style lang="less" scoped>
  #tload {
    width: 100%;
    height: 100%;
  }
  #tcontainer {
    width: 100%;
    height: 1080px;
    border: #ccc solid 1px;
  }
</style>
