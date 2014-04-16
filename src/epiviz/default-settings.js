/**
 * Created by Florin Chelaru ( florinc [at] umd [dot] edu )
 * Date: 10/9/13
 * Time: 11:13 AM
 */

/**
 * Overrides the default configuration settings for EpiViz
 */
epiviz.EpiViz.SETTINGS = {

  // PHP/MySQL Data

  dataServerLocation: '', // TODO: Fill in

  chartSaverLocation: 'src/chart_saving/save_svg.php',

  // Navigation settings

  zoominRatio: 0.8,
  zoomoutRatio: 1.2,
  navigationStepRatio: 0.2,

  navigationDelay: 100,

  // Initial genome location

  seqName: 'chr11',
  startLocation: 99800000,
  endLocation: 103383180,

  // Plug-ins

  dataProviders: [
    sprintf('epiviz.data.WebServerDataProvider,%s,%s',
      epiviz.data.WebServerDataProvider.DEFAULT_ID,
      '') // TODO: Fill in
  ],

  workspacesDataProvider: epiviz.data.WebServerDataProvider.DEFAULT_ID,

  cacheUpdateIntervalMilliseconds: 30000,

  chartTypes: [
    'epiviz.plugins.charts.BlocksTrackType',
    'epiviz.plugins.charts.LineTrackType',
    'epiviz.plugins.charts.ScatterPlotType',
    'epiviz.plugins.charts.GenesTrackType',
    'epiviz.plugins.charts.HeatmapPlotType'
  ],

  // Chart default settings

  chartSettings: {
    plot: {
      width: 400,
      height: 400,
      margins: new epiviz.ui.charts.Margins(15, 30, 30, 15),
      colors: new epiviz.ui.charts.ColorPalette(epiviz.Config.COLORS_BRIGHT)
    },

    track: {
      width: '100%',
      height: 90,
      margins: new epiviz.ui.charts.Margins(25, 20, 23, 10),
      colors: new epiviz.ui.charts.ColorPalette(epiviz.Config.COLORS_BRIGHT)
    },

    'epiviz.plugins.charts.GenesTrack': {
      height: 120,
      colors: new epiviz.ui.charts.ColorPalette([epiviz.Config.COLORS_MEDIUM[4], epiviz.Config.COLORS_MEDIUM[0], epiviz.Config.COLORS_MEDIUM[2], epiviz.Config.COLORS_MEDIUM[1], epiviz.Config.COLORS_MEDIUM[3], epiviz.Config.COLORS_MEDIUM[6], epiviz.Config.COLORS_MEDIUM[7]])
    },

    'epiviz.plugins.charts.ScatterPlot': {
      margins: new epiviz.ui.charts.Margins(15, 50, 50, 15)
    },

    'epiviz.plugins.charts.HeatmapPlot': {
      width: 800,
      height: 400,
      margins: new epiviz.ui.charts.Margins(80, 120, 40, 40),
      colors: new epiviz.ui.charts.ColorPalette(['#ffffff'].concat(epiviz.Config.COLORS_BRIGHT))
    }

  },

  chartCustomSettings: {
    'epiviz.plugins.charts.BlocksTrack': {
      minBlockDistance: 3
    },
    'epiviz.plugins.charts.GenesTrack': {

    },
    'epiviz.plugins.charts.LineTrack': {
      maxPoints: 100,
      showPoints: true,
      showLines: true,
      pointRadius: 3,
      lineThickness: 2
    },
    'epiviz.plugins.charts.ScatterPlot': {
      circleRadiusRatio: 0.01
    },
    'epiviz.plugins.charts.HeatmapPlot': {
      label: 'probe',
      maxColumns: 40
    }
  }
};
