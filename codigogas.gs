function reportesGoogleAnalytics() {
  const hojaconfig = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("config");
  const hojadatos = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('datosanalytics');
  hojadatos.getRange('A1:G').clear(); 

  const propertyIds = hojaconfig.getRange("A2:A").getValues().flat().filter(propertyId => propertyId);

  const dimensiones = hojaconfig.getRange("E2:E5").getValues().flat().filter(dim => dim && dim !== 'startDate' && dim !== 'endDate');
  const metricas = hojaconfig.getRange("F2:F5").getValues().flat().filter(met => met);

  const dimensionsArray = dimensiones.map(dimension => {
    const dim = AnalyticsData.newDimension();
    dim.name = dimension;
    return dim;
  });

  const metricsArray = metricas.map(metric => {
    const met = AnalyticsData.newMetric();
    met.name = metric;
    return met;
  });

/*
    // descomenta todo este bloque para obtener las fechas de inicio y fin (o los presets dates) desde config!E8 y config!F8
  const startDate = hojaconfig.getRange("E8").getValue();
  const endDate = hojaconfig.getRange("F8").getValue();

  // Configura el rango de fechas
  const dateRange = AnalyticsData.newDateRange();
  dateRange.startDate = startDate;
  dateRange.endDate = endDate;
*/
  
  // en este bloque seteas 1 mes completo de reporte, comenta todo este bloque si descomentas el anterior
  var fechaActual = new Date();
  var mesDeseado = -1; // 0 para el mes actual, -1 para el mes anterior y así....
  var primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + mesDeseado, 1);
  var ultimoDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + mesDeseado +1, 0);
  const dateRange = AnalyticsData.newDateRange();
  dateRange.startDate = Utilities.formatDate(primerDiaMes, 'GTM-3', 'yyyy-MM-dd');
  dateRange.endDate = Utilities.formatDate(ultimoDiaMes, 'GTM-3', 'yyyy-MM-dd');


  // filtro para obtener solo filas donde la métrica "Conversiones" sea mayor a 0
  const conversionFilter = AnalyticsData.newFilter();
  conversionFilter.fieldName = 'Conversions';
  conversionFilter.numericFilter = AnalyticsData.newNumericFilter();
  conversionFilter.numericFilter.operation = 'GREATER_THAN';
  conversionFilter.numericFilter.value = AnalyticsData.newNumericValue();
  conversionFilter.numericFilter.value.doubleValue = 0;

  const metricFilterExpression = AnalyticsData.newFilterExpression();
  metricFilterExpression.filter = conversionFilter;

  propertyIds.forEach((propertyId, index) => {
    try {
      const request = AnalyticsData.newRunReportRequest();
      request.dimensions = dimensionsArray;
      request.metrics = metricsArray;
      request.dateRanges = dateRange;
      request.metricFilter = metricFilterExpression; // Agrega el filtro a la solicitud, comentalo si no deseas usarlo

      const report = AnalyticsData.Properties.runReport(request, 'properties/' + propertyId);

      if (!report.rows) {
        Logger.log('No hay registros para el ID de propiedad: %s', propertyId);
      } else {
        if (index === 0) {
          const dimensionHeaders = report.dimensionHeaders.map(dimensionHeader => dimensionHeader.name);
          const metricHeaders = report.metricHeaders.map(metricHeader => metricHeader.name);
          const headers = [...dimensionHeaders, ...metricHeaders];
          hojadatos.getRange(1, 1, 1, headers.length).setValues([headers]);
        }

        const rows = report.rows.map(row => {
          const dimensionValues = row.dimensionValues.map(dimensionValue => dimensionValue.value);
          const metricValues = row.metricValues.map(metricValue => metricValue.value);
          return [...dimensionValues, ...metricValues];
        });
        hojadatos.getRange(hojadatos.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);

        hojaconfig.getRange(index + 2, 3).setValue(new Date());
        Logger.log('Reporte para la propiedad ID %s actualizado en la hoja', propertyId);
      }
    } catch (e) {
      Logger.log('Fallo en la propiedad ID %s con error: %s', propertyId, e.message);
    }
  });
}
