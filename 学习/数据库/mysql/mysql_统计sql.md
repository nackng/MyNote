##列出各个部门中工资高于本部门的平均工资的员工数和部门号，并按部门号排序
```
SELECT 
  ta.department_id,
  COUNT(*) 
FROM
  employees ta,
  (SELECT 
    department_id,
    AVG(salary) avgsal 
  FROM
    employees 
  GROUP BY department_id) tb 
WHERE ta.department_id = tb.department_id 
  AND ta.salary > tb.avgsal 
GROUP BY ta.department_id 
ORDER BY ta.department_id 
```
##
```
```
##
```
```
##
```
```
##
```
```
##
```
```