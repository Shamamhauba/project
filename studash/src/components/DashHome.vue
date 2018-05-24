<template>
  <div class="dashhome">
     <!-- <router-link :to="{ name: 'UserDetails'}">UserDetails</router-link> -->
     <div class="row">
        <div class="col-md-12">
           <h3>STUDENTS INFO CENTER</h3>
        </div>
     </div>
     <!-- 1st row -->
     <div class="row">
        <div class="col-md-12">
           <div class="box-panel">
              <div class="box-panel-heading">
                 <h3 class="box-panel-title">STUDENT RESULT</h3>
              </div>
              <div class="box-content">
                 <div id="studentsseries"></div>
              </div>
           </div>
        </div>
     </div>
     <!-- 2nd row -->
     <div class="row">
        <div class="col-md-6">
           <div class="box-panel">
              <div class="box-panel-heading">
                 <h3 class="box-panel-title">STUDENT DETAILS</h3>
              </div>
              <div class="box-content">
                 <div class="table-responsive">
                    <table class="table table-striped">
                       <thead>
                          <tr>
                             <th scope="col"></th>
                             <th scope="col">ID</th>
                             <th scope="col">NAME</th>
                             <th scope="col">COURSE01</th>
                             <th scope="col">COURSE02</th>
                             <th scope="col">TOTAL POINT</th>
                             <th scope="col">STATUS</th>
                          </tr>
                       </thead>
                       <tbody>
                          <tr data-toggle="modal" data-target="#exampleModalCenter" v-for="student in studentfile" @click="singleDetails(student.stu_id)">
                             <th scope="row">
                                <img class="img-circle pull-left avatar" v-bind:src="student.pro_pic">
                             </th>
                             <th>{{student.stu_id}}</th>
                             <td>{{student.name}}</td>
                             <td>{{validpass(student.sub[0].ques)}}</td>
                             <td>{{validpass(student.sub[1].ques)}}</td>
                             <td>{{totalcalpoint(validpass(student.sub[0].ques),validpass(student.sub[1].ques))}}</td>
                             <td>
                                <router-link :to="{ name: 'UserDetails', params: { id: student.stu_id}}"><span class="label label-info">DETAILS</span></router-link>
                                <!-- <span class="label label-info">DETAILS</span> -->
                             </td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        </div>
        <div class="col-md-3">
           <div class="box-panel">
              <div class="box-panel-heading">
                 <h3 class="box-panel-title">TIME SPENT FOR COURSE01</h3>
              </div>
              <div class="box-content">
                 <div id="course01piechart">{{course01pie()}}</div>
              </div>
           </div>
        </div>
        <div class="col-md-3">
           <div class="box-panel">
              <div class="box-panel-heading">
                 <h3 class="box-panel-title">TIME SPENT FOR COURSE02</h3>
              </div>
              <div class="box-content">
                 <div id="course02piechart"></div>
              </div>
           </div>
        </div>
     </div>
     <!-- 3rd row -->
     <div class="row">

        <div class="col-md-3">
           <div class="box-panel">
              <div class="box-panel-heading">
                 <h3 class="box-panel-title">AVG POINT COURSE01</h3>
              </div>
              <div class="box-content">
                <div id="student-gauge" style="width: 300px; height: 200px; float: center">

                </div>
              </div>
           </div>
        </div>
        <div class="col-md-3">
           <div class="box-panel">
              <div class="box-panel-heading">
                  <h3 class="box-panel-title">AVG POINT COURSE02</h3>
              </div>
              <div class="box-content">
                <div id="student-gauge2" style="width: 300px; height: 200px; float: center">

                </div>
              </div>
           </div>
        </div>
        <div class="col-md-6">
           <div class="box-panel">
              <div class="box-panel-heading">
                 <h3 class="box-panel-title">TOTAL TIME SPENT BY MONTH</h3>
              </div>
              <div class="box-content">
                <div id="student-stack">

                </div>
              </div>
           </div>
        </div>
     </div>
     <!-- text modal -->
     <!-- Modal -->
     <!-- <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"> <div
        class="modal-dialog modal-dialog-centered" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title"
        id="exampleModalLongTitle">{{singleuser.name}}</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span
        aria-hidden="true">&times;</span> </button> </div> </div> </div> </div> -->
  </div>
</template>
<script>
  import studentfile from '../assets/data/studentfile.json';
  import UserDetails from './UserDetails.vue'

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].stu_id === nameKey) {
        return myArray[i];
      }
    }
  }
  export default {
    name: 'DashHome',
    components: {
      UserDetails
    },
    data() {
      return {
        msg: 'Box Title Demo',
        studentfile: studentfile,
        singleuser: '',
        course01totalpoint: '',
        course02totalpoint: '',
        tpoint: '',
        tinput: '',
        stackdata: ''


      }
    },
    methods: {
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
      course01pie() {
        var self = this;

        var c1spentdataT = [];
        var studentstackdata = [];
        var c1avgvalue = [];
        var c2avgvalue = [];

        function totalspent(input) {

          function sum(ainput) {
            var res = 0;
            for (var idx = 0; idx <= ainput.length - 1; idx++) {
              res += ainput[idx].time_spent;
            }
            return res;
          }

          var myArray = [];
          var sub1 = [];
          var sub2 = [];
          var name = input.name;
          var s1q1 = sum(input.sub[0].ques[0].result);
          var s1q2 = sum(input.sub[0].ques[1].result);
          var result1 = s1q1 + s1q2;
          sub1.push(name);
          sub1.push(result1);
          sub1.push(false);


          var s2q1 = sum(input.sub[1].ques[0].result);
          // console.log(input.sub[0].ques[0]);
          var s2q2 = sum(input.sub[1].ques[1].result);
          var result2 = s2q1 + s2q2;
          sub2.push(name);
          sub2.push(result2);
          sub2.push(false);
          myArray.push(sub1);
          myArray.push(sub2)
          return myArray;
          // console.log('input',input);
        }
        this.studentfile.forEach(function(entry) {
          var val = totalspent(entry);
          var studentstack = arayvalue(entry);
          // console.log(entry);
          c1spentdataT.push(val);
          studentstackdata.push(studentstack);

          var t1 = self.validpass(entry.sub[0].ques);
          c1avgvalue.push(t1);
          var t2 = self.validpass(entry.sub[1].ques);
          c2avgvalue.push(t2);


        });

        function formatingarray(arr, index) {
          var newarr = [];
          for (var i = 0; i < arr.length; i++) {
            newarr.push(arr[i][index]);
          }
          return newarr;
        }
        var arraypie1 = formatingarray(c1spentdataT, 0);
        var arraypie2 = formatingarray(c1spentdataT, 1);
        // console.log(arraypie1);
        // console.log(arraypie2);

        // console.log(copie1);

        Highcharts.setOptions({
          colors: ['#f368e0', '#ff9f43', '#ee5253',
            '#0abde3', '#10ac84', '#01a3a4', '#2e86de', '#341f97', '#222f3e'
          ]
        });
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
              data: arraypie1,
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
              data: arraypie2,
              showInLegend: false
            }]
          })
        });


        //time SPENT


        // var c1spentdataT = [];
        //

        var self = this;

        function arayvalue(input) {
          function singlevalue(newinput) {
            function totalspent(data) {
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

            var tspent = totalspent(newinput.ques);
            // var ques2 = totalspent(newinput.ques[1]);
            // console.log(tspent);
            return tspent;

          }
          //
          // console.log(input.sub[0]);
          var tp = [];
          var sub1 = singlevalue(input.sub[0]);
          var sub2 = singlevalue(input.sub[1]);
          tp.push(sub1);
          tp.push(sub2);
          // console.log(tp);

          // console.log(sub1);
          var sumsp = tp[0].map((_, i) => tp.reduce((p, _, j) => p + tp[j][i], 0));
          var name = input.name;
          // console.log(sumsp);

          // return ques;



          var ob = {
            name: name,
            data: sumsp

          };

          // console.log(ob);
          // fordata(ob);
          return ob;

        }

        var dataseries = studentstackdata;
        $(function() {

          Highcharts.chart('student-stack', {
            chart: {
              type: 'bar'
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
              categories: ['JAN', 'FEB', 'MAR', 'APR']
            },
            yAxis: {
              min: 0,
              title: {
                text: ''
              }
            },
            legend: {
              reversed: true
            },
            plotOptions: {
              series: {
                stacking: 'normal'
              }
            },
            series: dataseries
          });
        });



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


          function getAvg(grades) {
            return grades.reduce(function(p, c) {
              return p + c;
            }) / grades.length;
          }
          var gauge1d = parseInt(getAvg(c1avgvalue));
          var gauge2d = parseInt(getAvg(c2avgvalue));
          console.log(gauge1d);

          //  gauge 01
          $('#student-gauge').highcharts(Highcharts.merge(gaugeOptions, {
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
              data: [gauge1d],
              dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                  '<span style="font-size:12px;color:silver">AVG MARK</span></div>'
              },
              tooltip: {
                valueSuffix: ''
              }
            }]

          }));

          // gauge 02
          $('#student-gauge2').highcharts(Highcharts.merge(gaugeOptions, {
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
              data: [gauge2d],
              dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                  '<span style="font-size:12px;color:silver">AVG MARK</span></div>'
              },
              tooltip: {
                valueSuffix: ''
              }
            }]

          }));

        });

        // end chart
      },
      singleDetails(stuid) {
        this.singleuser = search(stuid, this.studentfile);
        this.newchart();
        // show modal

        // chart

        // console.log(this.singleuser);
      },

      closeModal() {
        this.$modal.hide('user-details');
      },
      showlinechart() {

        var c1 = [];
        var c2 = [];
        var self = this;
        this.studentfile.forEach(function(entry) {
          var val = self.validpass(entry.sub[0].ques);
          // console.log(val);
          c1.push(val);
          var val2 = self.validpass(entry.sub[1].ques);
          // console.log(val);
          c2.push(val2);
          // console.log(entry);
        });

        var tomark = [];
        tomark.push(c1);
        tomark.push(c2);

        var sum = (tomark[0].map((_, i) => tomark.reduce((p, _, j) => p + tomark[j][i], 0)));
        // student.sub[0].ques
        var avg = [];
        for (var i = 0; i <= sum.length - 1; i++) {
          avg.push(sum[i] / 2);

        }
        // console.log(sum);

        $(function() {
          Highcharts.chart('studentsseries', {
            title: {
              text: ''
            },
            xAxis: {
              categories: ['Sofia Laura', 'Tavit Alen', 'Liisa Marta', 'Alex Arman']
            },
            exporting: {
              enabled: false
            },
            credits: {
              enabled: false,
            },
            labels: {
              items: [{
                html: 'TOTAL POINT',
                style: {
                  left: '50px',
                  top: '18px',
                  color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
              }]
            },
            series: [{
              type: 'column',
              name: 'COURSE01',
              data: c1
            }, {
              type: 'column',
              name: 'COURSE02',
              data: c2
            }, {
              type: 'spline',
              name: 'Average',
              data: avg,
              marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
              }
            }, {
              type: 'pie',
              name: 'POINT',
              data: [{
                name: 'Sofia',
                y: sum[0],
                color: Highcharts.getOptions().colors[0] // Jane's color
              }, {
                name: 'Tavit',
                y: sum[1],
                color: Highcharts.getOptions().colors[1] // John's color
              }, {
                name: 'Liisa',
                y: sum[2],
                color: Highcharts.getOptions().colors[2] // Joe's color
              }, {
                name: 'Alex',
                y: sum[3],
                color: Highcharts.getOptions().colors[3] // Joe's color
              }],
              center: [100, 80],
              size: 100,
              showInLegend: false,
              dataLabels: {
                enabled: false
              }
            }]
          })
        })



      }

    },
    created: function() {

      // `this` points to the vm instance
      //singleseries
      // console.log("created working");
      this.showlinechart();
      // console.log(this.studentfile);
      // this.course01pie();
      // console.log('cre - total',this.studentfile[0].sub[0].ques[0].result);
      // this.totalcalpoint(this.studentfile[0].sub[0].ques[0].result);
    },
    mounted: function() {
      this.$nextTick(function() {
        // Code that will run only after the
        // entire view has been rendered
        // this.$modal.show('user-details');
      })
    }
  }
</script>
<style scoped>
  .v--modal {
    background-color: #f5f5f5;
  }
</style>