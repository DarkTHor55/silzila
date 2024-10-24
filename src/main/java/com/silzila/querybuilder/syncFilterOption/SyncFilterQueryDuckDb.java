package com.silzila.querybuilder.syncFilterOption;

import com.silzila.exception.BadRequestException;
import com.silzila.payload.internals.QueryClauseFieldListMap;
import com.silzila.payload.request.*;
import com.silzila.querybuilder.SelectClauseMotherduck; // Ensure this is correctly set up for DuckDB
import com.silzila.querybuilder.WhereClause; // Adjust if necessary for DuckDB

import java.util.*;

public class SyncFilterQueryDuckDb {

    public static String getSyncFilterOptions(List<ColumnFilter> cf, String fromQuery, String vendorName) throws BadRequestException {
        try {
            // Check for null or empty filters
            if (cf == null || cf.isEmpty()) {
                throw new IllegalArgumentException("Column filters cannot be null or empty.");
            }

            // Initialize variables
            StringBuilder finalQuery = new StringBuilder("SELECT DISTINCT ");
            List<Filter> allFilters = new ArrayList<>();
            FilterPanel panel = new FilterPanel();
            List<Dimension> dimensions = new ArrayList<>();

            // Alias map for columns
            Map<String, Integer> aliasMap = new HashMap<>();
            int aliasCount = 1;

            // Process each ColumnFilter and create filter for it
            for (ColumnFilter columnFilter : cf) {
                if (columnFilter == null || columnFilter.getFieldName() == null || columnFilter.getFieldName().isEmpty()) {
                    throw new IllegalArgumentException("Invalid ColumnFilter: fieldName cannot be null or empty.");
                }

                // Add the column to the SELECT clause if currentSelection is false
                if (!columnFilter.getCurrentSelection()) {
                    String columnName = columnFilter.getTableId() + "." + columnFilter.getFieldName();
                    finalQuery.append(columnName).append(", ");  // Append column to the SELECT clause
                    aliasMap.put(columnName, aliasCount++);

                    // Create and add the Dimension object
                    Dimension dimension = new Dimension(
                            columnFilter.getTableId(),
                            columnFilter.getFieldName(),
                            Dimension.DataType.fromValue(columnFilter.getDataType().toString()),
                            Dimension.TimeGrain.fromValue(columnFilter.getTimeGrain().toString()),
                            false);
                    dimensions.add(dimension);
                }

                // User selections
                List<Object> userSelections = columnFilter.getUserSelection();

                // Create default filter condition for each column
                Filter filter = new Filter();
                filter.setTableId(columnFilter.getTableId());
                filter.setFieldName(columnFilter.getFieldName());
                filter.setDataType(Filter.DataType.fromValue(columnFilter.getDataType().toString()));
                filter.setTimeGrain(Filter.TimeGrain.fromValue(columnFilter.getTimeGrain().value()));

                // If there are user selections, add them to the filter
                if (userSelections != null && !userSelections.isEmpty()) {
                    filter.setShouldExclude(false);
                    filter.setOperator(Filter.Operator.IN);
                    filter.setUserSelection((List<String>) (List<?>) userSelections);
                    allFilters.add(filter);
                }
            }

            // Remove the last comma and space from the SELECT clause
            if (finalQuery.length() > 0) {
                finalQuery.setLength(finalQuery.length() - 2); // Remove the last ", "
            }

            // Append the FROM clause
            finalQuery.append(" FROM ").append(fromQuery);

            // Create FilterPanels from allFilters
            panel.setFilters(allFilters);
            panel.setPanelName("panel_" + fromQuery);
            panel.setShouldAllConditionsMatch(true);

            // Build WHERE clause using the panel
            String whereClause = WhereClause.buildWhereClause(Collections.singletonList(panel), "duckdb"); // Adjusted for DuckDB

            // Append the WHERE clause to the final query
            finalQuery.append(" WHERE ").append(whereClause); // Ensure WHERE is correctly prefixed

            // Print the generated query for debugging
            System.out.println("Generated DuckDB Query: " + finalQuery.toString());

            return finalQuery.toString();
        } catch (IllegalArgumentException e) {
            System.err.println("IllegalArgumentException: " + e.getMessage());
            throw new BadRequestException("Invalid input provided. " + e.getMessage());
        } catch (BadRequestException e) {
            System.err.println("BadRequestException: " + e.getMessage());
            throw e;
        } catch (Exception e) {
            System.err.println("An unexpected error occurred: " + e.getMessage());
            throw new BadRequestException("An unexpected error occurred while building the query.");
        }
    }
}
