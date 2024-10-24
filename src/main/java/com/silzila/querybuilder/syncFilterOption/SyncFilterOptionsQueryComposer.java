package com.silzila.querybuilder.syncFilterOption;

import com.silzila.domain.entity.Dataset;
import com.silzila.dto.DatasetDTO;
import com.silzila.exception.BadRequestException;
import com.silzila.payload.request.ColumnFilter;
import com.silzila.payload.request.Table;
import com.silzila.querybuilder.RelationshipClauseGeneric;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.accessibility.AccessibleTable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class SyncFilterOptionsQueryComposer {
    private static final Logger logger = LogManager.getLogger(SyncFilterOptionsQueryComposer.class);

    public static String composeQuery(List<ColumnFilter> cf, DatasetDTO ds, String vendorName,String userId) throws BadRequestException {
        logger.info("----------- SyncFilterOptionsQueryComposer calling......");
        String finalQuery = "";
        List<String>allIds=allTableIds(cf);
        String fromQuery= RelationshipClauseGeneric.buildRelationship(allIds, ds.getDataSchema(), vendorName);
        System.out.println("\n"+fromQuery+"----------"+"\n");

//reltionship class genric
//        create table with all data in it
        if (vendorName.equals("postgresql") || vendorName.equals("redshift")) {
            logger.info("------ inside postges/redshift block");
            finalQuery = SyncFilterQueryPostgres.getSyncFilterOptions(cf,fromQuery,vendorName);
            System.out.println(finalQuery);
        }else if (vendorName.equals("mysql")) {
            logger.info("------ inside mysql block");
            finalQuery = SyncFilterQueryMysql.getSyncFilterOptions(cf,fromQuery,vendorName);
        }
//        else if (vendorName.equals("sqlserver")) {
//            logger.info("------ inside sql server block");
//            finalQuery = SyncFilterQuerySqlserver.getSyncFilterOptions(cf, null);
//        } else if (vendorName.equals("databricks")) {
//            logger.info("------ inside databricks block");
//            finalQuery = SyncFilterQueryDatabricks.getSyncFilterOptions(cf, null);
//        } else if (vendorName.equals("duckdb")) {
//            logger.info("------ inside duckdb block");
//            finalQuery = SyncFilterQueryDuckDb.getSyncFilterOptions(cf, null);
//        } else if (vendorName.equals("bigquery")) {
//            logger.info("------ inside bigquery block");    "currentSelection" : true

//            finalQuery = SyncFilterQueryBigquery.getSyncFilterOptions(cf, null);
//        } else if (vendorName.equals("oracle")) {
//            logger.info("------ inside Oracle block");
//            finalQuery = SyncFilterQueryOracle.getSyncFilterOptions(cf, null);
//        } else if (vendorName.equals("snowflake")) {
//            logger.info("------ inside snowflake block");
//            finalQuery = SyncFilterQuerySnowflake.getSyncFilterOptions(cf, null);
//        } else if (vendorName.equals("motherduck")) {
//            logger.info("------ inside motherduck block");
//            finalQuery = SyncFilterQueryMotherduck.getSyncFilterOptions(cf, null);
//        } else if (vendorName.equals("db2")) {
//            logger.info("------ inside DB2 block");
//            finalQuery = SyncFilterQueryDB2.getSyncFilterOptions(cf, null);
//        } else if (vendorName.equals("teradata")) {
//            logger.info("------ inside teradata block");
//            finalQuery = SyncFilterQueryTeraData.getSyncFilterOptions(cf, null);
//        } else {
//            throw new BadRequestException("Error: DB vendor Name is wrong!");
//        }

        return finalQuery;
    }
//    set
    public static List<String> allTableIds(List<ColumnFilter>cf){
        if(cf.isEmpty())return new ArrayList<>();
        Set<String> allTableIds = new HashSet<>();
        for (ColumnFilter c : cf){
            allTableIds.add(c.getTableId());
        }
        List<String>listOfIds=new ArrayList<>();
        for (String c:allTableIds){
            listOfIds.add(c);
        }
        return listOfIds;
    }
}

