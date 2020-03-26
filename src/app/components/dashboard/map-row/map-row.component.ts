import { Component, OnInit, NgZone, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import brMap from '../map-row/map';
import { MapRowService } from '../../../services/dashboard/MapRow.service';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-map-row',
  templateUrl: './map-row.component.html',
  styleUrls: ['./map-row.component.css']
})
export class MapRowComponent implements OnInit, OnChanges, OnDestroy {

  private map;

  @Input() module: string;
  @Input() countryData = [];

  constructor(
    private zone: NgZone,
    private dataSource: MapRowService,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.countryData && this.countryData) {
      this.generateMap(changes.countryData.currentValue);
    }
  }

  generateMap(countryData) {
    const brMapFixed = brMap;
    const mapFeature = brMapFixed.features.map(item => ({
      type: item.type,
      geometry: item.geometry,
      properties: {
        ...item.properties,
        ...countryData.find(data =>
          data.stateName === item.properties.sigla
        )
      }
    }));

    brMapFixed.features = mapFeature;

    // Create map instance
    const map = am4core.create('mapdiv', am4maps.MapChart);
    map.zoomControl = new am4maps.ZoomControl();

    // Set map definition
    map.geodata = brMapFixed;
    // Set projection
    map.projection = new am4maps.projections.Mercator();

    // Create map polygon series
    const polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    map.series.push(polygonSeries);

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template;

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover');

    // polygonTemplate.tooltipText = 'Settings{name}: {totalValue}';

    // // Making it round
    map.chartContainer.background.events.on('hit', () => {
      zoomOut();
    });

    const colorSet = new am4core.ColorSet();

    // country area look and behavior
    polygonTemplate.strokeOpacity = 1;
    polygonTemplate.stroke = am4core.color('#ffffff');
    polygonTemplate.fillOpacity = 0.5;
    polygonTemplate.tooltipText = ('{name}: {totalValue}');
    // polygonTemplate.tooltipText = '{name}: {totalValue}';
    polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    // desaturate filter for countries
    const desaturateFilter = new am4core.DesaturateFilter();
    desaturateFilter.saturation = 0.25;
    polygonTemplate.filters.push(desaturateFilter);

    // take a color from color set
    polygonTemplate.adapter.add('fill', (fill, target) => {
      return colorSet.getIndex(target.dataItem.index + 1);
    });

    // set fillOpacity to 1 when hovered
    const hoverState = polygonTemplate.states.create('hover');
    hoverState.properties.fillOpacity = 1;

    // what to do when country is clicked
    polygonTemplate.events.on('hit', event => {
      const context: any = event.target.dataItem.dataContext; // Stop typescript error

      this.dataSource.getStateData(context.sigla).then(
        (res: any) => {
          pieSeries.data = [
            { value: res.emission, category: 'Emitidas' },
            { value: res.received, category: 'Recebidas' },
            { value: res.canceled, category: 'Canceladas' },
            { value: res.events, category: 'Eventos' },
          ];
          selectPolygon(event.target);
        }
      ).catch((error) => {
      });
    });

    // Pie chart
    const pieChart = map.seriesContainer.createChild(am4charts.PieChart);
    pieChart.width = 100;
    pieChart.height = 100;
    pieChart.visible = false;

    const pieSeries = pieChart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'category';
    pieSeries.data = [
      { value: 8, category: 'Emitidas' },
      { value: 8, category: 'Recebidas' },
      { value: 8, category: 'Canceladas' },
      { value: 8, category: 'Eventos' },
    ];

    const dropShadowFilter = new am4core.DropShadowFilter();
    dropShadowFilter.blur = 4;
    pieSeries.filters.push(dropShadowFilter);

    const sliceTemplate = pieSeries.slices.template;
    sliceTemplate.fillOpacity = 1;
    sliceTemplate.strokeOpacity = 0;

    const activeState = sliceTemplate.states.getKey('active');
    activeState.properties.shiftRadius = 0; // no need to pull on click, as country circle under the pie won't make it good

    const sliceHoverState = sliceTemplate.states.getKey('hover');
    sliceHoverState.properties.shiftRadius = 0; // no need to pull on click, as country circle under the pie won't make it good

    // we don't need default pie chart animation, so change defaults
    const hiddenState = pieSeries.hiddenState;
    hiddenState.properties.startAngle = pieSeries.startAngle;
    hiddenState.properties.endAngle = pieSeries.endAngle;
    hiddenState.properties.opacity = 0;
    hiddenState.properties.visible = false;

    // series labels
    const labelTemplate = pieSeries.labels.template;
    labelTemplate.fill = am4core.color('#FFFFFF');
    labelTemplate.background = new am4core.RoundedRectangle();
    labelTemplate.background.fillOpacity = 0.9;
    labelTemplate.padding(4, 9, 4, 9);
    labelTemplate.background.fill = am4core.color('#FFFFFF');

    // we need pie series to hide faster to avoid strange pause after country is clicked
    pieSeries.hiddenState.transitionDuration = 200;

    // country label
    const countryLabel = map.chartContainer.createChild(am4core.Label);
    countryLabel.text = 'Selecione um estado';
    countryLabel.fill = am4core.color('#999');
    countryLabel.fontSize = 40;

    countryLabel.hiddenState.properties.dy = 1000;
    countryLabel.defaultState.properties.dy = 0;
    countryLabel.valign = 'middle';
    countryLabel.align = 'right';
    countryLabel.paddingRight = 20;
    countryLabel.hide(0);
    countryLabel.show();

    let morphedPolygon;

    this.map = map;

    // select polygon
    function selectPolygon(polygon) {
      if (morphedPolygon !== polygon) {
        const animation = pieSeries.hide();
        if (animation) {
          animation.events.on('animationended', () => {
            morphToCircle(polygon);
          });
        } else {
          morphToCircle(polygon);
        }
      }
    }

    // fade out all countries exceptany
    function fadeOut(exceptPolygon?: any) {
      for (let i = 0; i < polygonSeries.mapPolygons.length; i++) {
        const polygon = polygonSeries.mapPolygons.getIndex(i);
        if (polygon !== exceptPolygon) {
          polygon.defaultState.properties.fillOpacity = 0.5;
          polygon.animate(
            [
              { property: 'fillOpacity', to: 0.5 },
              { property: 'strokeOpacity', to: 1 }
            ],
            polygon.polygon.morpher.morphDuration
          );
        }
      }
    }

    function zoomOut() {
      if (morphedPolygon) {
        pieSeries.hide();
        morphBack();
        fadeOut();
        countryLabel.hide();
        morphedPolygon = undefined;
        // map.zoomLevel = 1;
        map.zoomToGeoPoint({ latitude: -15, longitude: -50 }, 1, true);
      }
    }

    function morphBack() {
      if (morphedPolygon) {
        morphedPolygon.polygon.morpher.morphBack();
        const dsf = morphedPolygon.filters.getIndex(0);
        dsf.animate(
          { property: 'saturation', to: 0.25 },
          morphedPolygon.polygon.morpher.morphDuration
        );
      }
    }

    function morphToCircle(polygon) {
      const animationDuration = polygon.polygon.morpher.morphDuration;
      // if there is a country already morphed to circle, morph it back
      morphBack();
      // morph polygon to circle
      polygon.toFront();
      polygon.polygon.morpher.morphToSingle = true;
      const morphAnimation = polygon.polygon.morpher.morphToCircle();

      polygon.strokeOpacity = 0; // hide stroke for lines not to cross countries

      polygon.defaultState.properties.fillOpacity = 1;
      polygon.animate({ property: 'fillOpacity', to: 1 }, animationDuration);

      // animate desaturate filter
      const filter = polygon.filters.getIndex(0);
      filter.animate({ property: 'saturation', to: 1 }, animationDuration);

      // save currently morphed polygon
      morphedPolygon = polygon;

      // fade out all other
      fadeOut(polygon);

      // hide country label
      countryLabel.hide();

      if (morphAnimation) {
        morphAnimation.events.on('animationended', () => {
          zoomToCountry(polygon);
        });
      } else {
        zoomToCountry(polygon);
      }
    }

    function zoomToCountry(polygon) {
      const zoomAnimation = map.zoomToMapObject(polygon, 0.6, true);
      if (zoomAnimation) {
        zoomAnimation.events.on('animationended', () => {
          showPieChart(polygon);
        });
      } else {
        showPieChart(polygon);
      }
    }

    function showPieChart(polygon) {
      polygon.polygon.measure();
      pieChart.radius =
        polygon.pixelWidth /
        2 *
        polygon.globalScale /
        map.seriesContainer.scale;
      let centerPoint = am4core.utils.spritePointToSvg(
        polygon.polygon.centerPoint,
        polygon.polygon
      );
      centerPoint = am4core.utils.svgPointToSprite(
        centerPoint,
        map.seriesContainer
      );

      pieChart.x = centerPoint.x - 50;
      pieChart.y = centerPoint.y - 50;

      const fill = polygon.fill;
      const desaturated = fill.saturate(0.2).brighten(-0.3);

      for (let i = 0; i < pieSeries.dataItems.length; i++) {
        // pieSeries.dataItems.getIndex(i).value = nameValues[i];
        const dataItem = pieSeries.dataItems.getIndex(i);
        dataItem.slice.fill = am4core.color(am4core.colors.interpolate(
          fill.rgb,
          am4core.color('#ffffff').rgb,
          0.2 * i
        ));

        dataItem.label.background.fill = desaturated;
        dataItem.tick.stroke = fill;
      }

      pieSeries.show();
      pieChart.show();

      countryLabel.text = '{name}';
      // console.log(countryLabel.element.node.children[0].innerHTML);
      countryLabel.dataItem = polygon.dataItem;
      countryLabel.fill = desaturated;
      countryLabel.show();
    }
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.map) {
        this.map.dispose();
      }
    });
  }
}
