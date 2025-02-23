import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { changeChartOptionSelected } from "../../redux/ChartPoperties/ChartPropertiesActions";
import { chartTypes } from "./ChartTypes";
import { changeDynamicMeasureOption } from "../../redux/DynamicMeasures/DynamicMeasuresActions";
import ControlDetail from "./ControlDetail";

const ChartControlObjects = ({
  // state
  chartProp,
  tabTileProps,
  dynamicMeasureState,

  // dispatch
  changeChartOption,
  changeDynamicMeasureOption,
}: any) => {
  var propKey = `${tabTileProps.selectedTabId}.${tabTileProps.selectedTileId}`;
  var selectedChart = chartProp.properties[propKey].chartType;

  var selectedDynamicMeasureProps =
    dynamicMeasureState.dynamicMeasureProps?.[
      `${dynamicMeasureState.selectedTabId}`
    ]?.[`${dynamicMeasureState.selectedTileId}`]?.[
      `${dynamicMeasureState.selectedTileId}.${dynamicMeasureState.selectedDynamicMeasureId}`
    ];
  const richTextOptionList: string[] = ["Format", "Style", "Cond.Form"];

  const [value, setValue] = useState(false);

  const barOptionsList: string[] = [
    "Title",
    "Labels",
    "Legend",
    "Margin",
    "Grid/Axes",
    "Tooltip",
    "Colors",
    "Format",
    "Sort",
  ];
  const lineOptionsList: string[] = [
    "Title",
    "Labels",
    "Legend",
    "Margin",
    "Grid/Axes",
    "Tooltip",
    "Colors",
    "Format",
    "Sort",
    "Style",
  ];
  const treemapOptionsList: string[] = [
    "Title",
    "Labels",
    "Legend",
    "Margin",
    "Tooltip",
    "Colors",
    "Format",
    "Style",
    "Sort",
  ];

  const pieOptionsList: string[] = [
    "Title",
    "Labels",
    "Legend",
    "Margin",
    "Axis",
    "Tooltip",
    "Colors",
    "Format",
    "Sort",
  ];
  const funnelOptionList: string[] = [
    "Title",
    "Legend",
    "Margin",
    "Tooltip",
    "Colors",
    "Format",
    "Sort",
  ];
  const gaugeOptionList: string[] = [
    "Title",
    "Margin",
    "Axis",
    "Tooltip",
    "Colors",
    "Format",
    "Sort",
  ];
  const heatmapOptionList: string[] = [
    "Title",
    "Legend",
    "Labels",
    "Margin",
    "Colors",
    "Grid/Axes",
    "Tooltip",
    "Format",
    "Sort",
  ];
  const crossTabOptionList: string[] = [
    "Title",
    "Tooltip",
    "Style",
    "Format",
    "Sort",
    "Cond.Form",
    "Show/Hide",
  ];
  const boxPlotOptionsList: string[] = [
    "Title",
    "Legend",
    "Tooltip",
    "Margin",
    "Colors",
    "Grid/Axes",
    "Style",
    "Format",
    "Sort",
  ];
  const calendarOptionList: string[] = [
    "Title",
    "Legend",
    "Labels",
    "Margin",
    "Tooltip",
    "Colors",
    "Format",
    "Style",
    "Sort",
  ];
  const SankeyOptionList: string[] = [
    "Title",
    "Labels",
    "Margin",
    "Tooltip",
    "Colors",
    "Style",
    "Sort",
    "Format",
  ];
  const simpleCardOptionList: string[] = [
    "Label",
    "Colors",
    "Format",
    "Style",
    "Sort",
    "Cond.Form",
  ];
  const tableOptionList: string[] = [
    "Title",
    "Tooltip",
    "Style",
    "Format",
    "Sort",
    "Cond.Form",
  ];

  const filledMapOptionList: string[] = ["Title", "Labels", "Tooltip", "Style"];

  const bubbleMapOptionList: string[] = [
    "Title",
    "Labels",
    "Tooltip",
    "Colors",
    "Format",
    "Style",
  ];

  useEffect(() => {
    if (selectedChart === "simplecard") {
      changeChartOption(propKey, "Label");
    } else {
      changeChartOption(propKey, "Title");
    }
  }, [chartProp.properties[propKey].chartType, propKey]);

  const RenderOptions: any = () => {
    switch (selectedChart) {
      case "multibar":
      case "stackedBar":
      case "horizontalBar":
      case "horizontalStacked":
      case "scatterPlot":
        return barOptionsList.map((option) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });
      case "line":
      case "area":
      case "stackedArea":
        return lineOptionsList.map((option) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });
      case "calendar":
        return calendarOptionList.map((option) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });
      case "sankey":
        return SankeyOptionList.map((option) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });

      case "pie":
      case "donut":
      case "rose":
        return pieOptionsList.map((option) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });

      case "boxPlot":
        return boxPlotOptionsList.map((option) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });
      case "funnel":
        return funnelOptionList.map((option) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });

      case "gauge":
        return gaugeOptionList.map((option) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });

      case "heatmap":
        return heatmapOptionList.map((option) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });
      case "treeMap":
        return treemapOptionsList.map((option) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });

      case "table":
        return tableOptionList.map((option: string, i: number) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              style={{
                textAlign: "center",
                // gridColumn: i === 5 ? "1/span 2" : "auto",
              }}
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });
      case "crossTab":
        return crossTabOptionList.map((option) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });
      case "filledMap":
        return filledMapOptionList.map((option) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });
      case "bubbleMap":
        return bubbleMapOptionList.map((option) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });
      case "richText":
        return richTextOptionList.map((option: any, i: number) => {
          return (
            <div
              key={option}
              className={
                selectedDynamicMeasureProps?.chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              style={{
                textAlign: "center",
                gridColumn: i === 2 ? "1/span 3" : "auto",
              }}
              onClick={() => changeDynamicMeasureOption(option)}
            >
              {option}
            </div>
          );
        });
      case "simplecard":
        return simpleCardOptionList.map((option: any, i: number) => {
          return (
            <div
              key={option}
              className={
                chartProp.properties[propKey].chartOptionSelected === option
                  ? "optionImageSelected"
                  : "optionImage"
              }
              style={{
                textAlign: "center",
                // gridColumn: i === 5 ? "1/span 2" : "auto",
              }}
              onClick={() => changeChartOption(propKey, option)}
            >
              {option}
            </div>
          );
        });

      default:
        return <span> under construction</span>;
    }
  };

  return (
    <>
        {/* for{" "}
        {chartTypes.filter((chart) => chart.name === selectedChart)[0].value} */}
      {/* <div className="axisInfo" style={{ marginTop: "5px" }}>
        {selectedChartData ? (
          <img
            src={selectedChartData.icon}
            alt={selectedChartData.name}
            title={selectedChartData.value}
            className="selected-chart-icon"
          />
        ) : (
          <p>No icon available for the selected chart</p>
        )}
      </div> */}
      <div>
        <div className="chartOptionImagesContainer">
          <RenderOptions />
        </div>
        <ControlDetail />
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    chartProp: state.chartProperties,
    tabTileProps: state.tabTileProps,
    dynamicMeasureState: state.dynamicMeasuresState,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    changeChartOption: (propKey: string, chartOption: string) =>
      dispatch(changeChartOptionSelected(propKey, chartOption)),
    changeDynamicMeasureOption: (value: string) =>
      dispatch(changeDynamicMeasureOption(value)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartControlObjects);
