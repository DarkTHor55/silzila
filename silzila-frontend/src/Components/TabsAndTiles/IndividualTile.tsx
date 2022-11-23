// This component returns one single tile within the tabRibbon.
// Each tile has actions to rename the tile & delete the tile

import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Dispatch } from "redux";
import { duplicateControl } from "../../redux/ChartPoperties/ChartControlsActions";
import {
	ChartControl,
	ChartControlsProps,
	ChartControlStateProps,
} from "../../redux/ChartPoperties/ChartControlsInterface";
import { duplicateChartProperty } from "../../redux/ChartPoperties/ChartPropertiesActions";
import {
	ChartPropertiesProps,
	ChartPropertiesStateProps,
} from "../../redux/ChartPoperties/ChartPropertiesInterfaces";
import { TabStateProps, TabStateProps2 } from "../../redux/TabTile/TabStateInterfaces";
import { TabTileStateProps, TabTileStateProps2 } from "../../redux/TabTile/TabTilePropsInterfaces";
import { TileStateProps, TileStateProps2 } from "../../redux/TabTile/TileStateInterfaces";
import "./individualTile.css";
import { connect } from "react-redux";
import { renameTile } from "../../redux/TabTile/TileActions";
import { actionsToAddTile } from "../../redux/TabTile/TabTileActionsAndMultipleDispatches";

type IndTileStateProps = TabStateProps2 &
	TileStateProps2 &
	TabTileStateProps2 &
	ChartPropertiesStateProps &
	ChartControlStateProps;

interface IndividualTileProps {
	//state
	tabTileProps: TabTileStateProps;
	tabState: TabStateProps;
	tileState: TileStateProps;
	chartProperties: ChartPropertiesProps;
	chartControls: ChartControl;
	//props from parent
	tabName: string;
	tileName: string;
	editing: boolean;
	selectedTile: number;
	tabId: number;
	tileId: number;
	showDash: boolean;

	//functions
	renameTileBegin: (tabId: number, tileId: number) => void;
	renameTileComplete: (renameValue: string, tabId: number, tileId: number) => void;
	selectTile: (tileId: number, tileName: string, tabId: number, tabName: string) => void;
	removeTile: (tabId: number, tileId: number) => void;

	//dispatch
	renameTile: (tabId: number, nextTileId: number, newName: string) => void;
	actionsToAddTile: (
		tabId: number,
		nextTileId: number,
		table: any,
		fromTab: boolean,
		selectedDs: any,
		selectedTablesInDs: any
	) => void;
	duplicateControl: (propKey: number, chartControl: ChartControlsProps) => void;
	duplicateChartProperty: (propKey: number, chartProp: any) => void;
}

const IndividualTile = ({
	// props from Parent
	tabName,
	tileName,
	editing,
	selectedTile,
	tabId,
	tileId,
	showDash,

	// functions in parent
	renameTileBegin,
	renameTileComplete,
	selectTile,
	removeTile,

	//Dispatch
	renameTile,
	actionsToAddTile,
	duplicateControl,
	duplicateChartProperty,

	//state
	tabTileProps,
	tabState,
	tileState,
	chartControls,
	chartProperties,
}: IndividualTileProps) => {
	const [renameValue, setRenameValue] = useState<string>(tileName);

	const handleTileNameValue = (e: any) => {
		setRenameValue(e.target.value);
	};

	var menuStyle = { fontSize: "12px", padding: "2px 1rem" };

	const [anchorEl, setAnchorEl] = useState<null | any>(null);
	const open: boolean = Boolean(anchorEl);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => setAnchorEl(null);

	function setDuplicateName(
		fromTileName: string,
		newName: string,
		count: number,
		tabId: number,
		nextTileId: number
	) {
		tileState.tileList[tabId].map((tileKey: any) => {
			console.log(tileKey);
			if (tileState.tiles[tileKey].tileName === newName) {
				count = count + 1;
				newName = `${fromTileName} - copy(${count})`;
				setDuplicateName(fromTileName, newName, count, tabId, nextTileId);
			}
		});
		renameTile(tabId, nextTileId, newName);
	}

	const handleDuplicateTile = () => {
		handleClose();

		// get all information about this tile and set in appropriate tile id
		// give a unique tile name

		let tabObj: any = tabState.tabs[tabTileProps.selectedTabId];

		var propKey: number = parseFloat(
			`${tabTileProps.selectedTabId}.${tabTileProps.selectedTileId}`
		);

		var nextPropKey: number = parseFloat(`${tabTileProps.selectedTabId}.${tabObj.nextTileId}`);

		actionsToAddTile(
			tabObj.tabId, //tabId
			tabObj.nextTileId, //nextTileId:
			tabTileProps.selectedTable, //table:
			false, //fromTab:
			chartProperties.properties[propKey].selectedDs, //selectedDs:
			chartProperties.properties[propKey].selectedTable //selectedTablesInDs:
		);

		duplicateControl(
			nextPropKey,
			JSON.parse(JSON.stringify(chartControls.properties[propKey]))
		);

		duplicateChartProperty(
			nextPropKey,
			JSON.parse(JSON.stringify(chartProperties.properties[propKey]))
		);

		var count = 0;
		var fromTileName = tileState.tiles[propKey].tileName;
		var newName = `${fromTileName} - copy`;

		setDuplicateName(fromTileName, newName, count, tabObj.tabId, tabObj.nextTileId);
	};

	const RightClickMenu = () => {
		return (
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				open={open}
				onClose={() => handleClose()}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem
					onClick={e => {
						e.stopPropagation();
						renameTileBegin(tabId, tileId);
						handleClose();
					}}
					sx={menuStyle}
				>
					Rename Tile
				</MenuItem>
				<MenuItem
					onClick={e => {
						e.stopPropagation();
						handleDuplicateTile();
						handleClose();
					}}
					sx={menuStyle}
				>
					Duplicate Tile
				</MenuItem>
				<MenuItem
					onClick={e => {
						e.stopPropagation();
						removeTile(tabId, tileId);
						handleClose();
					}}
					sx={menuStyle}
				>
					Delete Tile
				</MenuItem>
			</Menu>
		);
	};

	if (selectedTile === tileId && editing) {
		return (
			<form
				style={{ display: "inline" }}
				onSubmit={(evt: any) => {
					evt.currentTarget.querySelector("input").blur();
					evt.preventDefault();
				}}
			>
				<input
					autoFocus
					value={renameValue}
					onChange={handleTileNameValue}
					className="editTileSelected"
					onBlur={() => renameTileComplete(renameValue, tabId, tileId)}
					title="Press enter or click away to save"
				/>
			</form>
		);
	} else {
		return (
			<span
				className={
					selectedTile === tileId && !showDash
						? "commonTile indiItemHighlightTile"
						: "commonTile indiItemTile"
				}
				onDoubleClick={e => {
					e.stopPropagation();
					console.log("Double clicked");
					renameTileBegin(tabId, tileId);
				}}
				onClick={e => {
					e.stopPropagation();
					console.log("Left clicked");
					selectTile(tileId, tileName, tabId, tabName);
				}}
				title={`${tileName}. Double click to edit name`}
				onContextMenu={e => {
					e.preventDefault();
					e.stopPropagation();
					console.log("Right Click");
					handleClick(e);
				}}
			>
				<span>{tileName}</span>
				<span
					title="Delete Tile"
					className="closeTile"
					onClick={e => {
						e.stopPropagation();
						removeTile(tabId, tileId);
					}}
				>
					X
				</span>
				<RightClickMenu />
			</span>
		);
	}
};

const mapStateToProps = (state: IndTileStateProps) => {
	return {
		tabState: state.tabState,
		tileState: state.tileState,
		tabTileProps: state.tabTileProps,
		chartProperties: state.chartProperties,
		chartControls: state.chartControls,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
	return {
		renameTile: (tabId: number, nextTileId: number, newName: string) =>
			dispatch(renameTile(tabId, nextTileId, newName)),
		actionsToAddTile: (
			tabId: number,
			nextTileId: number,
			table: any,
			fromTab: boolean,
			selectedDs: any,
			selectedTablesInDs: any
		) =>
			dispatch(
				actionsToAddTile({
					tabId,
					nextTileId,
					table,
					fromTab,
					selectedDs,
					selectedTablesInDs,
				})
			),
		duplicateControl: (propKey: number, chartControl: ChartControlsProps) =>
			duplicateControl(propKey, chartControl),
		duplicateChartProperty: (propKey: number, chartProp: any) =>
			dispatch(duplicateChartProperty(propKey, chartProp)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualTile);