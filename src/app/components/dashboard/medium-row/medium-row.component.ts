import { Component, OnInit, AfterViewInit, NgZone, OnDestroy, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4lang_br from '@amcharts/amcharts4/lang/pt_BR';
declare var $: any;

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-medium-row',
  templateUrl: './medium-row.component.html',
  styleUrls: ['./medium-row.component.css']
})
export class MediumRowComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() module: string;

  private data = [{}, {}, {}];

  private chart1: am4charts.XYChart;
  private chart2: am4charts.XYChart;
  private chart3: am4charts.XYChart;

  private mockData = [
    {
      graphClass: 'pink-toolbar',
      lastDate: new Date(),
      text: 'Emissões / Média',
      subText: 'Comparação entre emissões e média de emissão nos ultimos 5 dias'
    },
    {
      graphClass: 'green-toolbar',
      lastDate: new Date(),
      text: 'Emissões / Cancelamentos',
      subText: 'Taxa de emissões e cancelamentos nos ultimos 5 dias'
    },
    {
      graphClass: 'blue-toolbar',
      lastDate: new Date(),
      text: 'NFe',
      subText: 'Grafico de emissões, recebimentos, cancelamentos e eventos'
    }
  ];

  constructor(private zone: NgZone) { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('chartdiv0', am4charts.XYChart);
      chart.language.locale = am4lang_br;
      chart.scale = 0.8;
      chart.colors = new am4core.ColorSet;

      chart.colors.list = [
        new am4core.Color({
          r: 169,
          g: 255,
          b: 159
        }),
        new am4core.Color({
          r: 0,
          g: 191,
          b: 255
        })
      ];

      const data = [
        {
          date: new Date(2018, 1, 5),
          emissions: 25,
          media: 50
        },
        {
          date: new Date(2018, 1, 6),
          emissions: 130,
          media: 60
        },
        {
          date: new Date(2018, 1, 7),
          emissions: 170,
          media: 30
        },
        {
          date: new Date(2018, 1, 8),
          emissions: 50,
          media: 100
        },
        {
          date: new Date(2018, 1, 9),
          emissions: 80,
          media: 100
        }
      ];

      chart.data = data;

      // CHART AXIS
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 1;
      dateAxis.renderer.grid.template.stroke = am4core.color('#FFF');
      dateAxis.renderer.grid.template.strokeOpacity = 0.3;
      dateAxis.renderer.labels.template.fill = am4core.color('#fff');
      dateAxis.renderer.labels.template.fillOpacity = 0.85;
      dateAxis.renderer.labels.template.fontSize = 12;
      dateAxis.dateFormats.setKey('day', 'dd/MM');

      dateAxis.tooltip.background.fill = am4core.color('#d81b60');
      dateAxis.tooltip.background.fillOpacity = 0.8;
      dateAxis.tooltip.background.strokeWidth = 0;
      dateAxis.tooltip.background.cornerRadius = 3;
      dateAxis.tooltip.background.pointerLength = 0;
      dateAxis.tooltip.dy = 5;
      dateAxis.tooltip.fontSize = 12;
      dateAxis.tooltipDateFormat = 'dd MMMM yyyy';

      const dropShadow = new am4core.DropShadowFilter();
      dropShadow.dy = 1;
      dropShadow.dx = 1;
      dropShadow.opacity = 0.8;
      dateAxis.tooltip.filters.push(dropShadow);

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minGridDistance = 40;
      valueAxis.renderer.grid.template.stroke = am4core.color('#FFF');
      valueAxis.renderer.grid.template.strokeOpacity = 0.3;
      valueAxis.renderer.labels.template.fill = am4core.color('#fff');
      valueAxis.renderer.labels.template.fillOpacity = 0.85;
      valueAxis.renderer.labels.template.fontSize = 12;

      // Nomes para as Axis
      // dateAxis.title.text = 'Datas';
      // valueAxis.title.text = 'Emissões';

      // DATA LINE - SERIES
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'emissions';
      series.name = 'Emissões';
      series.strokeWidth = 8;

      const series2 = chart.series.push(new am4charts.LineSeries());
      series2.dataFields.dateX = 'date';
      series2.dataFields.valueY = 'media';
      series2.name = 'Média';
      series2.strokeWidth = 3;


      // CURSOR
      series.tooltipText = 'Emitidas: {valueY.value}'; // Sets the cursor to the tooltip text
      series.tooltip.fontSize = 12;
      series.tooltip.fill = new am4core.Color({ r: 255, g: 255, b: 255 });
      series.tooltip.fillOpacity = 0.8;
      series.tooltip.background.fillOpacity = 0.8;
      series.tooltip.background.strokeWidth = 0;
      // series.tooltip.background.strokeOpacity = 0.6;

      series2.tooltipText = 'Média de emissão: {valueY.value}'; // Sets the cursor to the tooltip text
      series2.tooltip.fontSize = 12;
      series2.tooltip.fillOpacity = 0.8;
      series2.tooltip.background.fillOpacity = 0.8;
      series2.tooltip.background.strokeWidth = 0;
      // series2.tooltip.background.strokeOpacity = 0.6;

      // Creates cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.disabled = true; // Disables lines
      chart.cursor.behavior = 'none'; // Disables zoom

      // Adds cursor full column
      chart.cursor.xAxis = dateAxis;
      chart.cursor.fullWidthLineX = true;
      chart.cursor.lineX.strokeWidth = 0;
      chart.cursor.lineX.fill = am4core.color('#8F3985');
      chart.cursor.lineX.fillOpacity = 0.1;

      // BULLETS
      const bullet2 = series2.bullets.push(new am4charts.CircleBullet());
      bullet2.properties.scale = 0.7;

      const bullethover2 = bullet2.states.create('hover');
      bullethover2.properties.scale = 1.1;

      // LEGENDS
      chart.legend = new am4charts.Legend();
      chart.legend.align = 'center';
      chart.legend.dy = 18;
      chart.legend.useDefaultMarker = true;
      chart.legend.scale = 0.8;
      chart.legend.opacity = 0.9;
      chart.legend.fixedWidthGrid = true;

      // ANIMATIONS
      series.interpolationDuration = 2500;
      series2.interpolationDuration = 3000;
      // series.interpolationEasing = am4core.ease.bounceOut;
      series2.interpolationEasing = am4core.ease.bounceOut;

      this.chart1 = chart;
    });

    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('chartdiv1', am4charts.XYChart);

      chart.scale = 0.8;
      chart.colors = new am4core.ColorSet;

      chart.colors.list = [
        new am4core.Color({
          r: 169,
          g: 255,
          b: 159
        }),
        new am4core.Color({
          r: 254,
          g: 175,
          b: 175
        })
      ];

      chart.tooltip.disabled = true;

      const data = [
        {
          date: new Date(2018, 1, 5),
          emissions: 180,
          cancels: 100
        },
        {
          date: new Date(2018, 1, 6),
          emissions: 140,
          cancels: 110
        },
        {
          date: new Date(2018, 1, 7),
          emissions: 150,
          cancels: 180
        },
        {
          date: new Date(2018, 1, 8),
          emissions: 180,
          cancels: 200
        },
        {
          date: new Date(2018, 1, 9),
          emissions: 100,
          cancels: 230
        }
      ];

      chart.data = data;

      // CHART AXIS
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 1;
      dateAxis.renderer.grid.template.stroke = am4core.color('#FFF');
      dateAxis.renderer.grid.template.strokeOpacity = 0.3;
      dateAxis.renderer.labels.template.fill = am4core.color('#fff');
      dateAxis.renderer.labels.template.fillOpacity = 0.85;
      dateAxis.renderer.labels.template.fontSize = 12;
      dateAxis.dateFormats.setKey('day', 'dd/MM');

      dateAxis.tooltip.background.fill = am4core.color('#43a047');
      dateAxis.tooltip.background.fillOpacity = 0.8;
      dateAxis.tooltip.background.strokeWidth = 0;
      dateAxis.tooltip.background.cornerRadius = 3;
      dateAxis.tooltip.background.pointerLength = 0;
      dateAxis.tooltip.dy = 5;
      dateAxis.tooltip.fontSize = 12;
      dateAxis.tooltipDateFormat = 'dd MMMM yyyy';

      const dropShadow = new am4core.DropShadowFilter();
      dropShadow.dy = 1;
      dropShadow.dx = 1;
      dropShadow.opacity = 0.8;
      dateAxis.tooltip.filters.push(dropShadow);

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minGridDistance = 40;
      valueAxis.renderer.grid.template.stroke = am4core.color('#FFF');
      valueAxis.renderer.grid.template.strokeOpacity = 0.3;
      valueAxis.renderer.labels.template.fill = am4core.color('#fff');
      valueAxis.renderer.labels.template.fillOpacity = 0.85;
      valueAxis.renderer.labels.template.fontSize = 12;

      // Nomes para as Axis
      // dateAxis.title.text = 'Datas';
      // valueAxis.title.text = 'Emissões';

      // DATA LINE - SERIES
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'emissions';
      series.name = 'Emissões';
      series.strokeWidth = 3;

      const series2 = chart.series.push(new am4charts.LineSeries());
      series2.dataFields.dateX = 'date';
      series2.dataFields.valueY = 'cancels';
      series2.name = 'Cancelamentos';
      series2.strokeWidth = 3;

      // CURSOR
      series.tooltipText = 'Emitidas: {valueY.value}'; // Sets the cursor to the tooltip text
      series.tooltip.fontSize = 12;
      series.tooltip.fillOpacity = 0.8;
      series.tooltip.background.fillOpacity = 0.8;
      series.tooltip.background.strokeWidth = 0;
      // series.tooltip.background.strokeOpacity = 0.6;

      series2.tooltipText = 'Canceladas: {valueY.value}'; // Sets the cursor to the tooltip text
      series2.tooltip.fontSize = 12;
      series2.tooltip.fillOpacity = 0.8;
      series2.tooltip.background.fillOpacity = 0.8;
      series2.tooltip.background.strokeWidth = 0;
      // series2.tooltip.background.strokeOpacity = 0.6;


      // Creates cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.disabled = true; // Disables lines
      chart.cursor.behavior = 'none'; // Disables zoom

      // Adds cursor full column
      // chart.cursor.xAxis = dateAxis;
      // chart.cursor.fullWidthLineX = true;
      // chart.cursor.lineX.strokeWidth = 0;
      // chart.cursor.lineX.fill = am4core.color('#8F3985');
      // chart.cursor.lineX.fillOpacity = 0.1;

      // SCROLLBAR
      // const scrollbarX = new am4charts.XYChartScrollbar();
      // scrollbarX.series.push(series);
      // chart.scrollbarX = scrollbarX;

      // BULLETS
      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.properties.scale = 0.7;

      const bullethover = bullet.states.create('hover');
      bullethover.properties.scale = 1.1;

      const bullet2 = series2.bullets.push(new am4charts.CircleBullet());
      bullet2.properties.scale = 0.7;

      const bullethover2 = bullet2.states.create('hover');
      bullethover2.properties.scale = 1.1;

      // LEGENDS
      chart.legend = new am4charts.Legend();
      chart.legend.align = 'center';
      chart.legend.dy = 18;
      chart.legend.useDefaultMarker = true;
      chart.legend.scale = 0.8;
      chart.legend.opacity = 0.9;

      // series.tensionX = 1;
      // series.tensionY = 1;

      // ANIMATIONS
      // series.interpolationDuration = 4000;
      // series2.interpolationDuration = 4500;
      series.interpolationDuration = 1700;
      series2.interpolationDuration = 1500;
      series.interpolationEasing = am4core.ease.bounceOut;
      series2.interpolationEasing = am4core.ease.bounceOut;

      this.chart2 = chart;
    });

    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('chartdiv2', am4charts.XYChart);

      chart.scale = 0.8;
      chart.colors = new am4core.ColorSet;

      chart.colors.list = [
        new am4core.Color({
          r: 169,
          g: 255,
          b: 159
        }),
        new am4core.Color({
          r: 254,
          g: 175,
          b: 175
        })
      ];

      const data = [
        {
          date: new Date(2018, 1, 5),
          emissions: 25,
          cancels: 4
        },
        {
          date: new Date(2018, 1, 6),
          emissions: 50,
          cancels: 19
        },
        {
          date: new Date(2018, 1, 7),
          emissions: 100,
          cancels: 50
        },
        {
          date: new Date(2018, 1, 8),
          emissions: 110,
          cancels: 80
        },
        {
          date: new Date(2018, 1, 9),
          emissions: 150,
          cancels: 100
        }
      ];

      chart.data = data;

      // CHART AXIS
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 1;
      dateAxis.renderer.grid.template.stroke = am4core.color('#FFF');
      dateAxis.renderer.grid.template.strokeOpacity = 0.3;
      dateAxis.renderer.labels.template.fill = am4core.color('#fff');
      dateAxis.renderer.labels.template.fillOpacity = 0.85;
      dateAxis.renderer.labels.template.fontSize = 12;
      dateAxis.dateFormats.setKey('day', 'dd/MM');

      dateAxis.tooltip.background.fill = am4core.color('#30b8c7');
      dateAxis.tooltip.background.fillOpacity = 0.8;
      dateAxis.tooltip.background.strokeWidth = 0;
      dateAxis.tooltip.background.cornerRadius = 3;
      dateAxis.tooltip.background.pointerLength = 0;
      dateAxis.tooltip.dy = 5;
      dateAxis.tooltip.fontSize = 12;
      dateAxis.tooltipDateFormat = 'dd MMMM yyyy';

      const dropShadow = new am4core.DropShadowFilter();
      dropShadow.dy = 1;
      dropShadow.dx = 1;
      dropShadow.opacity = 0.8;
      dateAxis.tooltip.filters.push(dropShadow);

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minGridDistance = 40;
      valueAxis.renderer.grid.template.stroke = am4core.color('#FFF');
      valueAxis.renderer.grid.template.strokeOpacity = 0.3;
      valueAxis.renderer.labels.template.fill = am4core.color('#fff');
      valueAxis.renderer.labels.template.fillOpacity = 0.85;
      valueAxis.renderer.labels.template.fontSize = 12;

      // Nomes para as Axis
      // dateAxis.title.text = 'Datas';
      // valueAxis.title.text = 'Emissões';

      // DATA LINE - SERIES
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'emissions';
      series.name = 'Emissões';
      series.strokeWidth = 3;

      const series2 = chart.series.push(new am4charts.LineSeries());
      series2.dataFields.dateX = 'date';
      series2.dataFields.valueY = 'cancels';
      series2.name = 'Cancelamentos';
      series2.strokeWidth = 3;


      // CURSOR
      series.tooltipText = 'Emitidas: {valueY.value}'; // Sets the cursor to the tooltip text
      series.tooltip.fontSize = 12;
      series.tooltip.fillOpacity = 0.8;
      series.tooltip.background.fillOpacity = 0.8;
      series.tooltip.background.strokeWidth = 0;
      // series.tooltip.background.strokeOpacity = 0.6;

      series2.tooltipText = 'Canceladas: {valueY.value}'; // Sets the cursor to the tooltip text
      series2.tooltip.fontSize = 12;
      series2.tooltip.fillOpacity = 0.8;
      series2.tooltip.background.fillOpacity = 0.8;
      series2.tooltip.background.strokeWidth = 0;
      // series2.tooltip.background.strokeOpacity = 0.6;



      // Creates cursor
      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineY.disabled = true; // Disables lines
      chart.cursor.behavior = 'none'; // Disables zoom

      // Adds cursor full column
      // chart.cursor.xAxis = dateAxis;
      // chart.cursor.fullWidthLineX = true;
      // chart.cursor.lineX.strokeWidth = 0;
      // chart.cursor.lineX.fill = am4core.color('#8F3985');
      // chart.cursor.lineX.fillOpacity = 0.1;

      // SCROLLBAR
      // const scrollbarX = new am4charts.XYChartScrollbar();
      // scrollbarX.series.push(series);
      // chart.scrollbarX = scrollbarX;

      // BULLETS
      const bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.properties.scale = 0.7;

      const bullethover = bullet.states.create('hover');
      bullethover.properties.scale = 1.1;

      const bullet2 = series2.bullets.push(new am4charts.CircleBullet());
      bullet2.properties.scale = 0.7;

      const bullethover2 = bullet2.states.create('hover');
      bullethover2.properties.scale = 1.1;

      // LEGENDS
      chart.legend = new am4charts.Legend();
      chart.legend.align = 'center';
      chart.legend.dy = 18;
      chart.legend.useDefaultMarker = true;
      chart.legend.scale = 0.8;
      chart.legend.opacity = 0.9;

      // series.tensionX = 1;
      // series.tensionY = 1;

      // ANIMATIONS
      series.interpolationDuration = 1500;
      series2.interpolationDuration = 1700;
      series.interpolationEasing = am4core.ease.bounceOut;
      series2.interpolationEasing = am4core.ease.bounceOut;

      this.chart3 = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart1) {
        this.chart1.dispose();
      }
      if (this.chart2) {
        this.chart2.dispose();
      }
      if (this.chart3) {
        this.chart3.dispose();
      }
    });
  }
}
