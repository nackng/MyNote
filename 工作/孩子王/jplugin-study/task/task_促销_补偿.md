###补偿方式
```
/**
     * 补偿方式,0-不补偿;1-销量(特供价);2-按折扣
     *
     * 版本 >= 0
     */
    private long Compensate;

    /**
     * 补偿折扣类型,0-整体补偿;1-按品类;2-按品牌
     *
     * 版本 >= 0
     */
    private long CompensateDisType;


品类补偿：Compensate=2; CompensateDisType=1;
品牌补偿：Compensate=2; CompensateDisType=2;
商品补偿：Compensate=1;;

```