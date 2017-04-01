[TOC]
##库存分析
###接口
```
package com.haiziwang.kwms.downlink.dao;

import com.haiziwang.kwms.common.dao.base.BaseDao;
import com.haiziwang.kwms.common.domain.bean.InvInventory;


import java.util.List;
import java.util.Map;

/**
 * Copyright: 2016 Haiziwang
 * *
 * Author:  Daniel Kong
 * Date:    2016-03-01
 * Desc:    库存操作
 */
public interface InvInventoryDao extends BaseDao<InvInventory, Long> {



    /**
     * 库存占用量分析数量
     *
     * @param invInventory
     * @return
     */
    Integer selectInventoryCount(InvInventory invInventory);


}

```
###实现类
```
package com.haiziwang.kwms.downlink.dao.impl;

import com.haiziwang.kwms.common.dao.base.BaseDaoSupport;
import com.haiziwang.kwms.common.domain.bean.InvInventory;
import com.haiziwang.kwms.common.domain.enums.WMS3ExceptionCode;
import com.haiziwang.kwms.common.domain.exception.WMS3UnCheckedException;
import com.haiziwang.kwms.downlink.dao.InvInventoryDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

/**
 * Copyright: 2016 Haiziwang
 * *
 * Author:  Daniel Kong
 * Date:    2016-03-01
 * Desc:    库存服务
 */
@Repository("invInventoryDao")
public class InvInventoryDaoImpl extends BaseDaoSupport<InvInventory, Long> implements InvInventoryDao {

    private static final Logger logger = LoggerFactory.getLogger(InvInventoryDaoImpl.class);
    private static final String NAMESPACE = "mybatis.mapper.InvInventoryMapper";

    public InvInventoryDaoImpl() {
        super(NAMESPACE);
    }



    /**
     * 查询库存
     *
     * @param invInventory
     * @return
     */
    @Override
    public Integer selectInventoryCount(InvInventory invInventory) {
        try {
            return this.getMySqlSessionTemplate().selectOne(NAMESPACE + ".selectInventoryCount", invInventory);
        } catch (Exception e) {
            e.printStackTrace();
            throw new WMS3UnCheckedException(WMS3ExceptionCode.DB_OPERATOR_EXPT.getCode(), e);
        }
    }


}

```
###mapper文件
```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<!-- Author: Daniel Kong -->
<mapper namespace="mybatis.mapper.InvInventoryMapper">
    <resultMap id="BaseResultMap" type="com.haiziwang.kwms.common.domain.bean.InvInventory">
        <id column="sys_no" property="sysNo" jdbcType="BIGINT"/>
        <result column="company_sys_no" property="companySysNo" jdbcType="BIGINT"/>
        <result column="company_code" property="companyCode" jdbcType="VARCHAR"/>
        <result column="company_name" property="companyName" jdbcType="VARCHAR"/>
        <result column="wh_sys_no" property="whSysNo" jdbcType="BIGINT"/>
        <result column="wh_no" property="whNo" jdbcType="VARCHAR"/>
        <result column="wh_name" property="whName" jdbcType="VARCHAR"/>
        <result column="sku_sys_no" property="skuSysNo" jdbcType="BIGINT"/>
        <result column="sku_code" property="skuCode" jdbcType="VARCHAR"/>
        <result column="sku_name" property="skuName" jdbcType="VARCHAR"/>
        <result column="lot_no" property="lotNo" jdbcType="VARCHAR"/>
        <result column="loc_sys_no" property="locSysNo" jdbcType="BIGINT"/>
        <result column="location_no" property="locationNo" jdbcType="VARCHAR"/>
        <result column="lpn_sys_no" property="lpnSysNo" jdbcType="BIGINT"/>
        <result column="lpn_no" property="lpnNo" jdbcType="VARCHAR"/>
        <result column="qty_allocated" property="qtyAllocated"
                jdbcType="INTEGER"/>
        <result column="qty_onhand" property="qtyOnhand" jdbcType="INTEGER"/>
        <result column="hold_flag" property="holdFlag" jdbcType="CHAR"/>
        <result column="source_type" property="sourceType"
                jdbcType="TINYINT"/>
        <result column="source_no" property="sourceNo" jdbcType="VARCHAR"/>
        <result column="yn" property="yn" jdbcType="TINYINT"/>
        <result column="ts" property="ts" jdbcType="TIMESTAMP"/>
        <result column="create_time" property="createTime" jdbcType="TIMESTAMP"/>
        <result column="create_pin" property="createPin" jdbcType="VARCHAR"/>
        <result column="update_pin" property="updatePin" jdbcType="VARCHAR"/>

        <result column="alloc_zone_sys_no" property="zoneSysNo" jdbcType="BIGINT"/>
        <result column="alloc_zone_no" property="zoneCode" jdbcType="VARCHAR"/>
        <result column="work_area_sys_no" property="areaSysNo" jdbcType="BIGINT"/>
        <result column="work_area_no" property="areaSysCode" jdbcType="VARCHAR"/>
    </resultMap>



    <!-- 查询库存 -->
    <select id="selectInventoryCount" resultType="java.lang.Integer"
            parameterType="com.haiziwang.kwms.common.domain.bean.InvInventory">
        select count(1)
        from inv_inventory
        where sku_code = #{skuCode} and yn = 1
    </select>


</mapper>
```
##从中台拉取商品同步到 KWMS
###接口
```

```