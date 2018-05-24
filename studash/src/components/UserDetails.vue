<template lang="html">
<div>
    <!-- <button @click="goHome" type="button" name="button">Back</button> <h1>{{userid}}</h1> -->
    <div class="row">
        <div class="col-md-12">
<button @click="goHome" type="button" class="float-right btn-back btn"> BACK </button>
            <h3>STUDENT DETAILS</h3>
        </div>
    </div>

    <div class="row">
        <div class="col-md-3">
            <div class="box-panel">
                <div class="box-panel-heading">
                    <!-- <h3 class="box-panel-title">STUDENT DETAILS</h3> -->
                    <div class="profile-header align-center">
                        <img class="img-circle profile-img" v-bind:src="currentuserdata.pro_pic">

                            <h4 class="name">{{currentuserdata.name}}</h4>
                            <h4 class="profile-reg">{{currentuserdata.stu_id}}</h4>
                        </div>

                    </div>

                </div>

                <div class="box-panel">
            
                    <div class="row">
                        <div class="col-md-12">
                            <div id="gauge1" style="width: 300px; height: 200px; float: center">

                            </div>
                              <h4 class="cname align-center">COURSE 01</h4>
                        </div>
                        <div class="col-md-12">
                            <div id="gauge2" style="width: 300px; height: 200px; float: center"></div>
                            <h4 class="cname align-center">COURSE 02</h4>
                        </div>

                    </div>

                </div>

            </div>
            <div class="col-md-6">
                <div class="box-panel">
                    <div class="box-panel-heading">
                        <h3 class="box-panel-title">COURSE WORK 01</h3>
                        <div id="sub1col"></div>
                    </div>

                </div>
                <br>
                <div class="box-panel">
                    <div class="box-panel-heading">
                        <h3 class="box-panel-title">COURSE WORK 02</h3>
                        <div id="sub2col"></div>
                    </div>

                </div>
            </div>
            <div class="col-md-3">
                <div class="box-panel">
                    <div class="box-panel-heading">
                        <h3 class="box-panel-title">TIME SPENT FOR CO 01</h3>
                        <div id="course01piechart"></div>
                    </div>
                </div>
                <div class="box-panel">
                    <div class="box-panel-heading">
                        <h3 class="box-panel-title">TIME SPENT FOR CO 02</h3>
                        <div id="course02piechart"></div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>
</template>
<script>
  import studentfile from '../assets/data/studentfile.json';

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].stu_id === nameKey) {
        return myArray[i];
      }
    }
  }

  export default {
    name: 'UserDetails',
    data() {
      return {
        msg: "User Details TEST",
        userid: '',
        userfile: studentfile,
        currentuserdata: ''
      }
    },
    methods: {
      userdata(userid) {
        this.currentuserdata = search(parseInt(userid), this.userfile);
        // console.log(this.currentuserdata.pro_pic);
        this.userChart(this.currentuserdata);
        this.pieData(this.currentuserdata);
        this.gaugechart(this.currentuserdata);
      },

      validpass(input) {
        // console.log('valid',input);
        // console.log('valid',input.length);
        // console.log('valid',input);

        function sum(ainput) {
          var res = 0;
          for (var idx = 0; idx <= ainput.length - 1; idx++) {
            res += ainput[idx].point;
          }
          return res;
        }
        var s1q1 = sum(input[0].result);
        var s1q2 = sum(input[1].result);
        var result = s1q1 + s1q2;
        return result;
      },
      totalcalpoint(c1, c2) {
        return c1 + c2;
      },
      gaugechart(data) {
        var result1 = parseInt(this.validpass(data.sub[0].ques));

        // var togo = 100 - result;
        var result2 = parseInt(this.validpass(data.sub[1].ques));

        // var togo2 = 100 - result;

        // console.log(result);
        // simple chart
        // start chart
        $(function() {

          var gaugeOptions = {

            chart: {
              type: 'solidgauge'
            },

            title: {
              text: ''
            },
            exporting: {
              enabled: false
            },
            credits: {
              enabled: false,
            },
            pane: {
              center: ['50%', '85%'],
              size: '140%',
              startAngle: -90,
              endAngle: 90,
              background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
              }
            },

            tooltip: {
              enabled: false
            },

            // the value axis
            yAxis: {
              stops: [
                [0.1, '#ee5253'], // red
                [0.5, '#ff9f43'], // yellow
                [0.9, '#10ac84'] // green
              ],
              lineWidth: 0,
              minorTickInterval: null,
              tickPixelInterval: 400,
              tickWidth: 0,
              title: {
                y: -70
              },
              labels: {
                y: 16
              }
            },

            plotOptions: {
              solidgauge: {
                dataLabels: {
                  y: 5,
                  borderWidth: 0,
                  useHTML: true
                }
              }
            }
          };


          // function getAvg(grades) {
          //   return grades.reduce(function(p, c) {
          //     return p + c;
          //   }) / grades.length;
          // }
          // var gauge1d = parseInt(getAvg(c1avgvalue));
          // var gauge2d = parseInt(getAvg(c2avgvalue));
          // console.log(gauge1d);

          //  gauge 01
          $('#gauge1').highcharts(Highcharts.merge(gaugeOptions, {
            yAxis: {
              min: 0,
              max: 100,
              title: {
                text: ''
              }
            },

            credits: {
              enabled: false
            },

            series: [{
              name: 'Temperature',
              data: [result1],
              dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                  '<span style="font-size:12px;color:silver">TOTAL MARK</span></div>'
              },
              tooltip: {
                valueSuffix: ''
              }
            }]

          }));

          // gauge 02
          $('#gauge2').highcharts(Highcharts.merge(gaugeOptions, {
            yAxis: {
              min: 0,
              max: 100,
              title: {
                text: ''
              }
            },

            credits: {
              enabled: false
            },

            series: [{
              name: 'Temperature',
              data: [result2],
              dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                  '<span style="font-size:12px;color:silver">TOTAL MARK</span></div>'
              },
              tooltip: {
                valueSuffix: ''
              }
            }]

          }));

        });
      },
      pieData(data) {
        var c1spentdataT = [];

        function arayvalue(input) {

          function totalspent(data) {
            // console.log(data);
            var spent = [];
            // console.log(data);
            // console.log(data.length);
            for (var idx = 0; idx <= data.length - 1; idx++) {
              var q = [];
              for (var i = 0; i <= data[idx].result.length - 1; i++) {
                // console.log(data[idx].result[i].time_spent);
                q.push(data[idx].result[i].time_spent);

              }

              spent.push(q);

            }


            var sum = spent[0].map((_, i) => spent.reduce((p, _, j) => p + spent[j][i], 0));
            return sum;

          }

          var ques = totalspent(input.ques);
          console.log(input.ques);
          return ques;
        }
        var sub01 = arayvalue(data.sub[0]);
        var sub02 = arayvalue(data.sub[1]);
        // console.log(sub01);
        // console.log(sub02);


        $(function() {
          Highcharts.chart('course01piechart', {

            title: {
              text: ''
            },
            exporting: {
              enabled: false
            },
            credits: {
              enabled: false,
            },
            xAxis: {
              // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },

            series: [{
              type: 'pie',
              allowPointSelect: true,
              keys: ['name', 'y', 'selected', 'sliced'],
              data: [
                ['Jan', sub01[0], false],
                ['Feb', sub01[1], false],
                ['Mar', sub01[2], false],
                ['Apr', sub01[3], false]
              ],
              showInLegend: false
            }]
          })
        });
        $(function() {
          Highcharts.chart('course02piechart', {

            title: {
              text: ''
            },
            exporting: {
              enabled: false
            },
            credits: {
              enabled: false,
            },
            xAxis: {
              // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },

            series: [{
              type: 'pie',
              allowPointSelect: true,
              keys: ['name', 'y', 'selected', 'sliced'],
              data: [
                ['Jan', sub02[0], false],
                ['Feb', sub02[1], false],
                ['Mar', sub02[2], false],
                ['Apr', sub02[3], false]
              ],
              showInLegend: false
            }]
          })
        });
        //   function formatingarray(arr,index) {
        //       var newarr = [];
        //       for(var i=0; i<arr.length; i++){
        //             newarr.push(arr[i][index]);
        //       }
        //       return newarr;
        //   }
        // var arraypie1 =formatingarray(c1spentdataT,0);
        // var arraypie2 = formatingarray(c1spentdataT,1);
        // console.log(arraypie1);

      },
      userChart(data) {
        function arayvalue(input) {
          function getval(ainput) {
            var res = [];
            for (var idx = 0; idx <= ainput.length - 1; idx++) {
              // res.push(ainput[idx].result);
              var ress = [];
              var qn = '';
              for (var i = 0; i <= ainput[idx].result.length - 1; i++) {
                ress.push(ainput[idx].result[i].point);
                // console.log(ainput[idx].result[i].point);
                qn = "QUES0" + (idx + 1);
              }
              var ob = {
                name: qn,
                data: ress
              };
              res.push(ob);
            }
            return res;
          }
          var ques = getval(input.ques);
          return ques;
        }

        var sub01 = arayvalue(data.sub[0]);
        var sub02 = arayvalue(data.sub[1]);
        // console.log(sub02);

        Highcharts.setOptions({
          colors: ['#f368e0', '#0abde3', '#ee5253',
            '#ff9f43', '#10ac84', '#01a3a4', '#2e86de', '#341f97', '#222f3e'
          ]
        });
        $(function() {
          Highcharts.chart('sub1col', {
            chart: {
              type: 'column'
            },
            title: {
              text: ''
            },
            exporting: {
              enabled: false
            },
            credits: {
              enabled: false,
            },
            xAxis: {
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr'
              ],
              crosshair: true
            },
            yAxis: {
              min: 0,
              title: {
                text: 'POINTS'
              }
            },
            tooltip: {

            },
            plotOptions: {
              column: {
                pointPadding: 0.2,
                borderWidth: 0
              }
            },
            series: sub01
          })
        });

        $(function() {
          Highcharts.chart('sub2col', {
            chart: {
              type: 'column'
            },
            title: {
              text: ''
            },
            exporting: {
              enabled: false
            },
            credits: {
              enabled: false,
            },
            xAxis: {
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr'
              ],
              crosshair: true
            },
            yAxis: {
              min: 0,
              title: {
                text: 'POINTS'
              }
            },
            tooltip: {

            },
            plotOptions: {
              column: {
                pointPadding: 0.2,
                borderWidth: 0
              }
            },
            series: sub02
          })
        });
      },
      goHome() {
        this.$router.push('/');
      }
    },
    created() {
      // log(this.$route.params.id);
      // this.userid = this.$route.params.id;
      // this.userChart();
      this.userdata(this.$route.params.id);
      // console.log(this.$route.params.id);
    }
  }
</script>
<style lang="css">
</style>